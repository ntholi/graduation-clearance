export default interface ClearanceStatus {
  message?: string | null;
  status: 'pending' | 'cleared' | 'not cleared';
}
