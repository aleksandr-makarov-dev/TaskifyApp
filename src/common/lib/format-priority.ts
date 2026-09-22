export function formatPriority(value: number) {
  switch (value) {
    case 1:
      return "Low";
    case 2:
      return "Medium";
    case 3:
      return "High";
    case 4:
      return "Critical";
    default:
      return "Unknown";
  }
}
