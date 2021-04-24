export const isOfficeHours = (): boolean => {
  const now = new Date()
  // is it sunday or saturday?
  if (now.getDay() === 0 || now.getDay() === 6) {
    return false
  } else {
    // between working hours?
    if (9 < now.getHours() && now.getHours() < 17) {
      return true
    }
    return false
  }
}
