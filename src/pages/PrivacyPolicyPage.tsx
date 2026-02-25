import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

export function PrivacyPolicyPage() {
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
          <h1 className="text-lg font-bold">CMoney 隱私權政策</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 prose prose-sm max-w-none">
        <p className="text-sm leading-relaxed mb-6 text-muted-foreground">
          CMoney 全曜財經資訊股份有限公司 ( 以下簡稱「CMoney」) 非常重視會員的隱私權且遵循「個人資料保護法」之規定，因此制訂了隱私權保護政策，當您登錄成為 CMoney 會員時，敬請注意下列事項：
        </p>

        <section className="mb-6">
          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            使用者進入 CMoney 相關網站、應用程式時，並不需要輸入個人資料，例如姓名或電子郵件地址等，除非明確告知，CMoney 不會在使用者不知情的情況下，取得使用者之個人資料。在某些情況下，例如當使用者要求加入會員、使用電子郵件服務或參加課程、講座或其他活動時，我們的相關網站及合作對象可能會要求使用者提供或登錄個人資料，以便於和使用者聯繫、完成交易、提供服務、或處理相關程序。在此等情況下，我們的相關網站或其合作對象將明白告知使用者此等事實，使用者得自由選擇是否提供個人資料，但請您注意！如拒絕提供相關個人資料，將可能導致無法享受完整服務或完全無法使用相關服務。
          </p>

          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            CMoney 的相關網站、應用程式及合作對象所取得的個人資料，僅供於內部、依照原來所說明的使用目的和範圍，除非事先說明、或依照相關法律規定，否則我們不會將使用者個人資料提供給第三人、或移作其他目的使用。
          </p>

          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            當會員完成 CMoney 之會員註冊手續、或開始使用本服務時，即表示已閱讀、瞭解並同意接受本服務條款之所有內容，且完全接受本服務現有與未來衍生的服務項目及內容。
          </p>

          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            CMoney 有權於任何時間修改或變更本服務條款之內容，修改後的服務條款內容將公佈於網站上，CMoney 將不會個別通知會員，建議會員隨時注意該等修改或變更。會員於任何修改或變更後繼續使用本服務時，視為會員已閱讀、瞭解並同意接受該等修改或變更。若不同意上述的服務條款修訂或更新方式，或不接受本服務條款的其他任一約定，會員應立即停止使用本服務。
          </p>

          <p className="text-sm leading-relaxed text-muted-foreground">
            若會員為未滿二十歲之未成年人，應於會員的家長（或監護人）閱讀、瞭解並同意本約定書之所有內容及其後修改變更後，方得註冊為會員、使用或繼續使用本服務。當會員使用或繼續使用 CMoney 時，即推定會員的家長（或監護人）已閱讀、瞭解並同意接受本約定書之所有內容及其後修改變更。
          </p>
        </section>

        <section className="mb-6">
          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            為了確保會員之個人資料、隱私及消費者權益之保護，於交易過程中將使用會員之個人資料，謹依個人資料保護法第8條規定告知以下事項：
          </p>

          <h3 className="text-sm font-bold mb-2">蒐集之目的：</h3>
          <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
            蒐集之目的在於進行行銷業務、消費者、客戶管理與服務及其他電子商務服務及與調查、統計、研究分析（法定特定目的項目編號為Ｏ四Ｏ、Ｏ九Ｏ、一四八、一五七）。CMoney 將藉由加入會員之過程或進行交易之過程來蒐集個人資料。
          </p>

          <h3 className="text-sm font-bold mb-2">蒐集之個人資料類別：</h3>
          <p className="text-sm leading-relaxed mb-2 text-muted-foreground">
            CMoney 於網站、應用程式內蒐集的個人資料包括，
          </p>
          <ul className="text-sm leading-relaxed mb-4 text-muted-foreground space-y-1 list-disc pl-5">
            <li><strong>C001 辨識個人者：</strong>如會員之姓名、居住地、電話、電子郵件、身分證、影本等資訊。</li>
            <li><strong>C002 辨識財務者：</strong>如信用卡或金融機構帳戶資訊。</li>
            <li><strong>C011 個人描述：</strong>例如：性別、出生年月日等。</li>
          </ul>

          <p className="text-sm leading-relaxed mb-2 text-muted-foreground">
            若您安裝本公司App，為了提供您更完善的服務及下列用途，將針對您的行動裝置存取以下項目：
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-xs border border-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="border border-border px-3 py-2 text-left font-medium">存取權限</th>
                  <th className="border border-border px-3 py-2 text-left font-medium">用途</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-3 py-2 text-muted-foreground">位置</td>
                  <td className="border border-border px-3 py-2 text-muted-foreground">行銷活動等資訊發送及通知或獎勵發放的依據</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 text-muted-foreground">通知</td>
                  <td className="border border-border px-3 py-2 text-muted-foreground">推播通知</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 text-muted-foreground">指紋辨識/Touch ID/Face ID</td>
                  <td className="border border-border px-3 py-2 text-muted-foreground">身分識別</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 text-muted-foreground">日曆</td>
                  <td className="border border-border px-3 py-2 text-muted-foreground">提醒事件新增至裝置日曆</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2 text-muted-foreground">iOS及Android 6以上：儲存裝置<br/>Android 5以下：相機/相片/多媒體/檔案</td>
                  <td className="border border-border px-3 py-2 text-muted-foreground">儲存憑證、圖片、影片、文件</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-sm font-bold mb-2">利用期間、地區、對象及方式：</h3>
          <ul className="text-sm leading-relaxed mb-3 text-muted-foreground space-y-2 list-disc pl-5">
            <li><strong>期間：</strong>CMoney 營運期間。</li>
            <li><strong>地區：</strong>會員之個人資料將用於台灣地區及符合主管機關國際傳輸規定之其他地區。</li>
            <li><strong>利用對象及方式：</strong>會員之個人資料蒐集除用於 CMoney 之會員管理、客戶管理之檢索查詢等功能外，亦將利用於辨識身份、金流服務、物流服務、行銷廣宣等。例示如下：
              <ul className="mt-2 space-y-2 list-[lower-alpha] pl-5">
                <li>以會員身份使用 CMoney 提供之各項服務時，於頁面中自動顯示會員資訊。特別提醒，當您在 CMoney 上發佈內容或資料，代表您允許所有人（包括 CMoney 以外的人士）存取或使用該資料，並且將之與您聯想在一起（例如，您的名字和大頭貼照）。</li>
                <li>使用者對商品或課程為購買、報名、參與等活動或從事其他交易時，關於價金給付、回覆客戶及會員之詢問、相關售後服務及其他遂行交易所必要之業務。</li>
                <li>宣傳廣告或行銷：不定期提供會員各種商品或課程、講座等資訊，並透過電子郵件、電話等方式提供與服務相關之資訊。並將會員所瀏覽之內容或廣告，依客戶之個人屬性或購買紀錄及網站之瀏覽紀錄等項目，進行會員使用服務之分析、新服務之開發或既有服務之改善等。</li>
                <li>針對使用者透過電子郵件、電話、或其他任何直接或間接連絡方式向 CMoney 所提出之詢問進行回覆，或針對其他服務關連事項，與使用者進行聯繫。</li>
                <li>其他業務附隨之事項：附隨於上述 A. 至 D. 之利用目的而為 CMoney 提供服務所必要之使用。</li>
              </ul>
            </li>
          </ul>

          <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
            您可能參與本公司之合作夥伴之活動或行銷計畫，或希望將您存在本公司之個人資料提供作為合作夥伴認識客戶或評估是否成立契約關係之基礎，為此目的，本公司得經過您的同意後，將您的個人資料分享予合作夥伴，分享方式不限於直接提供予合作夥伴或以自動帶入資訊之方式請您確認其正確性。本公司不對任何提供予合作夥伴之個人資料之及時性負責。
          </p>

          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong>健康資料的蒐集、利用與處理：</strong>CMoney 的相關網站與應用程式可能會要求存取或蒐集與使用者健康相關的資料（如 Health 與健康資料）。取得同意後，這些資料僅限於提供服務所需，並依法保護您的隱私權。在應用程式的商店資訊頁面和應用程式內，CMoney 將在服務中清楚說明資料利用之目的，以及如何存取、處理及保護使用者資料。
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-sm font-bold mb-2">會員就個人資料之權利：</h3>
          <p className="text-sm leading-relaxed mb-2 text-muted-foreground">
            CMoney 所蒐集個人資料之當事人，依個人資料保護法得行使以下權利：
          </p>
          <ul className="text-sm leading-relaxed mb-3 text-muted-foreground space-y-1 list-disc pl-5">
            <li>查詢或請求閱覽。</li>
            <li>請求製給複製本。</li>
            <li>請求補充或更正。</li>
            <li>請求停止蒐集、處理或利用。</li>
            <li>請求刪除。</li>
          </ul>
          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            會員如欲行使上述權利，可與 CMoney 客服連絡進行申請。
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong>※ 請注意！</strong>如拒絕提供加入會員所需必要之資料，將可能導致無法享受完整服務或完全無法使用本服務。
          </p>
        </section>

        <section className="mb-6">
          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            CMoney 的相關網站或網頁都可能包含其他網站或網頁的連結，對於此等不屬於 CMoney 之網站或網頁，不論關於其內容或隱私權政策，均與 CMoney 無關。
          </p>

          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            CMoney 可能會使用 Cookie。Cookies 是伺服端為了區別使用者的不同，經由瀏覽器寫入使用者硬碟的一些簡短資訊。只有原設置 Cookie 的網站能讀取其內容。我們使用 Cookies 大多基於輔助作用，例如儲存您偏好的特定種類資料，或儲存相關密碼以方便您上網至本公司網站時不必每次再輸入密碼。Cookie 並不含任何資料足使他人透過電話、電子郵件與您聯絡。您可在您的網站瀏覽器上設定功能以獲知何時 Cookies 被記錄或避免 Cookies 的設置。
          </p>

          <p className="text-sm leading-relaxed text-muted-foreground">
            請妥善保管您的網路密碼及個人資料，不要將任何個人資料，尤其是網路密碼提供給任何人。在您使用完本網站所提供的各項服務功能後，務必記得登出帳戶，若您是與他人共享電腦或使用公共電腦，切記要關閉瀏覽器視窗。
          </p>
        </section>

        <section>
          <p className="text-sm leading-relaxed text-muted-foreground">
            CMoney 將可不時修訂本網站政策。會員如果對於 CMoney 網站之隱私權聲明、或與個人資料有關之相關事項有任何疑問，可以透過 Line @zdx5025y( 使用教學 ) 或電子郵件 (Email：csservice@cmoney.com.tw )和 CMoney 客服聯絡。
          </p>
        </section>
      </div>
    </div>
  );
}
