export interface SmsResult {
  to: string;
  success: boolean;
  mock: boolean;
  error?: string;
}

// SOLAPI 발신번호 사전등록이 끝나기 전까지는 실제 발송 대신 로그만 남기는 Mock 모드로 동작합니다.
// 환경변수 3개(SOLAPI_API_KEY, SOLAPI_API_SECRET, SOLAPI_SENDER_NUMBER)가 모두 채워지면 자동으로 실제 발송으로 전환됩니다.
export async function sendSms(to: string, text: string): Promise<SmsResult> {
  const apiKey = process.env.SOLAPI_API_KEY;
  const apiSecret = process.env.SOLAPI_API_SECRET;
  const senderNumber = process.env.SOLAPI_SENDER_NUMBER;

  if (!apiKey || !apiSecret || !senderNumber) {
    console.log(`[MOCK SMS] to ${to}: ${text}`);
    return { to, success: true, mock: true };
  }

  try {
    const { SolapiMessageService } = await import("solapi");
    const messageService = new SolapiMessageService(apiKey, apiSecret);
    await messageService.send({ to, from: senderNumber, text });
    return { to, success: true, mock: false };
  } catch (e) {
    const error = extractSolapiError(e);
    console.error(`[SMS FAILED] to ${to}:`, error, e);
    return { to, success: false, mock: false, error };
  }
}

function extractSolapiError(e: unknown): string {
  if (e && typeof e === "object") {
    const err = e as {
      message?: string;
      errorMessage?: string;
      failedMessageList?: { statusMessage?: string; statusCode?: string }[];
    };
    if (err.failedMessageList?.length) {
      return err.failedMessageList
        .map((f) => `${f.statusCode ?? ""} ${f.statusMessage ?? ""}`.trim())
        .join(", ");
    }
    if (err.errorMessage) return err.errorMessage;
    if (err.message) return err.message;
  }
  return "문자 발송에 실패했습니다";
}
