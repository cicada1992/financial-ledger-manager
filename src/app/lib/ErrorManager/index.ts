class ErrorManager {
  private fallbackErrorMessage = '서비스가 원활하지 않습니다.';

  alert(error: Error | any): void {
    alert(error?.message || this.fallbackErrorMessage);
  }
}

const instance = new ErrorManager();
export default instance;
