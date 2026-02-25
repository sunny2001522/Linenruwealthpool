import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

export function CopyrightPolicyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate("/help-center")}
            className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">CMoney 著作權保護政策</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 prose prose-sm max-w-none">
        <p className="text-sm leading-relaxed mb-6 text-muted-foreground">
          CMoney 全曜財經資訊股份有限公司（以下簡稱『CMoney』）尊重他人著作權，並於服務條款明定，網友使用本服務不得侵害他人之著作權。因此，CMoney 呼籲使用者同樣尊重他人之著作權。如果您認為我們網站中之任何網頁內容或網友使用本服務已侵害到您的著作權，請您利用下列方式提出檢舉，我們將儘速為您處理。
        </p>

        <section className="mb-6">
          <h2 className="text-base font-bold mb-3">檢舉方式：</h2>

          <h3 className="text-sm font-bold mb-3">一、權利人檢舉：</h3>
          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            若 CMoney 網站中之任何網頁內容或網友使用 CMoney 網站服務已侵害到您的著作權，請您填寫「著作權侵害通知書」（點擊此處下載），並依該通知書所載提供下列資料及聲明並經簽名或蓋章後，以傳真的方式或將通知書掃瞄後 E-mail 通知我們。此通知應載明下列事項，並由著作權人、製版權人、專屬授權之被授權人（以下簡稱權利人）或權利人之代理人簽名或蓋章：
          </p>

          <ul className="text-sm leading-relaxed mb-4 text-muted-foreground space-y-2 list-disc pl-5">
            <li>權利人或其代理人之姓名或名稱、地址及聯絡電話、傳真號碼、電子郵件信箱或其他自動聯繫方式之說明。</li>
            <li>被侵害之著作或製版之名稱。；如可在網際網路上取得此資訊，則最好將其連結發送給我們。</li>
            <li>侵害著作權之內容所在頁面的網址 ( URL ) …等（讓 CMoney 確認該涉有侵權內容之相關資訊）。</li>
            <li>相關聲明係基於善意並且為真實，如有不實致 CMoney 或他人受損害者，願負一切相關的法律責任。</li>
          </ul>

          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong>請注意，</strong>CMoney 接獲權利人的通知書後，將儘速移除權利人所主張涉有侵害著作權之網頁內容，並會將此檢舉資訊依據使用會員提供之聯絡方式告知其涉有侵權之情事。
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-sm font-bold mb-3">二、被檢舉人異議：</h3>
          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            若您遭權利人檢舉而對於權利人的主張有異議，請您填寫「著作權侵害異議通知書」（點擊此處下載），並依該通知書所載提供下列資料及聲明並經簽名或蓋章後，以傳真的方式或將通知書掃瞄後 E-mail 通知我們。
          </p>

          <ul className="text-sm leading-relaxed mb-4 text-muted-foreground space-y-2 list-disc pl-5">
            <li>使用者或其代理人之姓名或名稱、地址及聯絡電話、傳真號碼或電子郵件信箱。</li>
            <li>請求回復被移除或無法進入之內容之聲明。</li>
            <li>表示使用者基於善意，認為其有合法權利利用該內容，而該內容被移除或使他人無法進入，係出於權利人或其代理人不實或錯誤之陳述。</li>
            <li>同意資訊儲存服務提供者將回復通知轉送予權利人或其代理人。</li>
            <li>如有不實致他人受損害者，使用者願負法律責任。</li>
          </ul>

          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong>請注意，</strong>相關的網頁內容若經權利人主張涉有侵害其著作權者，該內容一旦經 CMoney 刪除後，我們即無法再行回復。又使用會員如有三次涉有侵權情事者，CMoney 將終止該使用會員全部或部分之服務。
          </p>
        </section>

        <section>
          <h3 className="text-sm font-bold mb-3">三、CMoney 客服聯絡方式：</h3>
          <div className="bg-muted/30 rounded-lg p-4 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-sm font-medium min-w-[100px]">LINE線上客服：</span>
              <span className="text-sm text-muted-foreground">@cm82526620</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-sm font-medium min-w-[100px]">傳真：</span>
              <span className="text-sm text-muted-foreground">02-22576050</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-sm font-medium min-w-[100px]">E-mail信箱：</span>
              <span className="text-sm text-muted-foreground">csservice@cmoney.com.tw</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
