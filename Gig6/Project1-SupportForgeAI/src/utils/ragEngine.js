/**
 * SupportForge Semantic RAG & Intent Retrieval Engine
 * Accurately matches user inquiries to knowledge base chunks,
 * detects sentiment and escalation intents, and formats grounded responses.
 */

// Simple tokenizer & keyword normalizer
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2);
}

// Stopwords to ignore in scoring
const STOPWORDS = new Set([
  'the', 'and', 'for', 'that', 'this', 'with', 'from', 'have', 'what',
  'how', 'can', 'you', 'your', 'about', 'some', 'please', 'tell', 'want',
  'need', 'know', 'does', 'will', 'would', 'should', 'are', 'was'
]);

export function performRAGQuery(query, knowledgeBase, customDocs = []) {
  const normalizedQuery = query.toLowerCase().trim();
  const queryTokens = tokenize(normalizedQuery).filter(t => !STOPWORDS.has(t));

  // 1. Check for Human Escalation Intent
  const escalationKeywords = [
    'human', 'agent', 'person', 'representative', 'operator', 'talk to someone',
    'speak with someone', 'manager', 'escalate', 'lawyer', 'sue', 'complaint', 'real person'
  ];
  const isEscalationRequested = escalationKeywords.some(kw => normalizedQuery.includes(kw));

  if (isEscalationRequested) {
    return {
      intent: 'HUMAN_ESCALATION',
      confidence: 0.99,
      latencyMs: 140,
      matchedDoc: null,
      response: `I understand you'd prefer to speak directly with a human team member. I can route this immediately to our priority queue. Would you like me to create an expedited ticket for you right now?`,
      canEscalate: true
    };
  }

  // Combine built-in docs with any dynamically added custom documents
  const allDocs = [...knowledgeBase.documents, ...customDocs];

  // 2. Score Document Chunks
  let bestDoc = null;
  let highestScore = 0;

  allDocs.forEach(doc => {
    let score = 0;
    const docText = `${doc.title} ${doc.content} ${(doc.keywords || []).join(' ')}`.toLowerCase();
    const docTokens = new Set(tokenize(docText));

    // Keyword exact phrase matches (High weight)
    if (doc.keywords) {
      doc.keywords.forEach(kw => {
        if (normalizedQuery.includes(kw.toLowerCase())) {
          score += 15;
        }
      });
    }

    // Token overlap matches
    queryTokens.forEach(token => {
      if (docTokens.has(token)) {
        score += 4;
      }
    });

    // Title phrase match
    if (normalizedQuery.includes(doc.title.toLowerCase())) {
      score += 20;
    }

    if (score > highestScore) {
      highestScore = score;
      bestDoc = doc;
    }
  });

  // Calculate simulated confidence
  const confidence = highestScore > 0 ? Math.min(0.99, 0.70 + (highestScore / 100) * 0.28) : 0.35;
  const simulatedLatency = Math.floor(180 + Math.random() * 90);

  // 3. Fallback: Out of Domain / Low Confidence
  if (!bestDoc || highestScore < 4) {
    return {
      intent: 'OUT_OF_DOMAIN',
      confidence: 0.42,
      latencyMs: simulatedLatency,
      matchedDoc: null,
      response: `I checked our verified knowledge base for "${query}", but I don't have enough verified documentation to give you a 100% accurate answer.

To ensure you don't receive incorrect information, would you like me to connect you with a human specialist or check our general documentation?`,
      canEscalate: true
    };
  }

  // 4. Grounded Response Synthesis
  const groundedResponse = `According to our **${bestDoc.citation}**:

${bestDoc.content}

Is there anything specific regarding **${bestDoc.title}** that you'd like me to clarify?`;

  return {
    intent: 'GROUNDED_FAQ_RETRIEVAL',
    confidence: Number(confidence.toFixed(3)),
    latencyMs: simulatedLatency,
    matchedDoc: bestDoc,
    response: groundedResponse,
    canEscalate: false
  };
}
