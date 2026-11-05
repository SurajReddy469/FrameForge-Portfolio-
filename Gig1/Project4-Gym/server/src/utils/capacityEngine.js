// FitPulse Server-Side Class Capacity & Membership Rule Engine

function validateBookingRules({ user, targetClass, existingBookings = [] }) {
  if (!targetClass) {
    return { allowed: false, status: 404, message: 'Class session not found.' };
  }

  // 1. Capacity Lock Check
  if (targetClass.capacityBooked >= targetClass.capacityMax) {
    return {
      allowed: false,
      status: 400,
      message: `Class session '${targetClass.title}' has reached maximum studio capacity (${targetClass.capacityMax} spots full).`
    };
  }

  // 2. Membership Tier Restriction
  if (user && user.membershipTier === 'Basic') {
    return {
      allowed: false,
      status: 403,
      message: 'Basic Floor membership does not include studio class access. Please upgrade to Pro or Elite in membership settings.'
    };
  }

  // 3. Class Credits Check (Elite tier has unlimited)
  if (user && user.membershipTier !== 'Elite' && (user.classCredits !== undefined && user.classCredits <= 0)) {
    return {
      allowed: false,
      status: 400,
      message: 'You have exhausted your class credits for this billing period. Please renew or upgrade to Elite Unlimited.'
    };
  }

  // 4. Duplicate Confirmed Booking Prevention
  const hasDuplicate = existingBookings.some(
    (b) =>
      b.userId === (user._id || user.id) &&
      (b.classId === (targetClass._id || targetClass.id)) &&
      b.status === 'Confirmed'
  );

  if (hasDuplicate) {
    return {
      allowed: false,
      status: 409,
      message: `You already have an active reservation for '${targetClass.title}' on ${targetClass.scheduleDay} at ${targetClass.scheduleTime}.`
    };
  }

  return { allowed: true };
}

function generateBookingCode() {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `FIT-BOOK-${digits}`;
}

function generateQRHash(bookingCode, userId) {
  return `FIT-QR-${Buffer.from(`${bookingCode}:${userId}:${Date.now()}`).toString('base64').slice(0, 16)}`;
}

module.exports = {
  validateBookingRules,
  generateBookingCode,
  generateQRHash
};
