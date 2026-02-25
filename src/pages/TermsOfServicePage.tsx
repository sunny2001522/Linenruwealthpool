import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

export function TermsOfServicePage() {
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
          <h1 className="text-lg font-bold">CMoney 會員服務條款</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 prose prose-sm max-w-none">
        <section className="mb-6">
          <h2 className="text-base font-bold mb-3">一、認知與接受條款</h2>
          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            全曜財經資訊股份有限公司（以下稱CMoney）係依據本服務條款提供 CMoney 會員服務（以下稱「服務」），包括但不限於：
          </p>
          <ul className="text-sm leading-relaxed mb-3 text-muted-foreground space-y-1 list-disc pl-5">
            <li>理財寶（https://www.cmoney.tw/app）</li>
            <li>股市爆料同學會（https://www.cmoney.tw/follow）</li>
            <li>股市（https://www.cmoney.tw/finance）</li>
            <li>雲端控股（https://www.cmoney.tw/notice）</li>
            <li>股市大富翁（https://www.cmoney.tw/vt）</li>
            <li>投資網誌（https://www.cmoney.tw/notes）</li>
            <li>選股網（https://www.cmoney.tw/screeners）</li>
            <li>投資小學堂（https://www.cmoney.tw/learn）</li>
            <li>FanBar（https://www.fanbar.tw）</li>
            <li>其他應用程式APP</li>
          </ul>
          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            當會員完成 CMoney 之會員註冊手續、或開始使用本服務時，即表示已閱讀、瞭解並同意接受本服務條款之所有內容，且完全接受本服務現有與未來衍生的服務項目及內容。
          </p>
          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            CMoney 有權於任何時間修改或變更本服務條款之內容，修改後的服務條款內容將公佈於網站上，CMoney 將不會個別通知會員，建議會員隨時注意該等修改或變更。會員於任何修改或變更後繼續使用本服務時，視為會員已閱讀、瞭解並同意接受該等修改或變更。若不同意上述的服務條款修訂或更新方式，或不接受本服務條款的其他任一約定，會員應立即停止使用本服務。
          </p>
          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            若會員為未滿十八歲之未成年人，應於會員的家長（或監護人）閱讀、瞭解並同意本服務條款之所有內容及其後修改變更後，方得註冊為會員、使用或繼續使用本服務。當會員使用或繼續使用 CMoney 時，即推定會員的家長（或監護人）已閱讀、瞭解並同意接受本服務條款所有內容及其後修改變更。
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            我們透過本程式或本網站為您提供Youtube播放服務。您瞭解並同意本服務是符合「YouTube API 服務條款」及「YouTube服務條款」的第三方播放器，所有影片都是透過 YouTube 官方提供的 API 嵌入式播放器進行播放。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-base font-bold mb-3">二、會員的註冊義務</h2>
          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            為了能使用本服務，會員同意以下事項：
          </p>
          <ul className="text-sm leading-relaxed mb-3 text-muted-foreground space-y-2 list-disc pl-5">
            <li>依本服務註冊表之提示提供會員本人正確、最新的資料，且不得以第三人或虛構之名義註冊為會員。每位會員僅能註冊登錄一個帳號，不可重覆註冊登錄。</li>
            <li>即時維持並更新會員個人資料，確保其正確性，以獲取最佳之服務。</li>
            <li>若會員提供任何錯誤或不實的資料、或未按指示提供資料、或欠缺必要之資料、或有重覆註冊帳號等情事時，CMoney 有權不經事先通知，逕行暫停或終止會員的帳號，並拒絕會員使用本服務之全部或一部。</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-base font-bold mb-3">三、CMoney 隱私權政策</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            關於會員的註冊以及其他特定資料將依『CMoney 隱私權政策』受到保護與規範。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-base font-bold mb-3">四、會員帳號、密碼及安全</h2>
          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            完成本服務的登記程序之後，會員將取得一個特定之密碼及會員帳號，維持密碼及帳號之機密安全，是會員的責任。任何依照規定方法輸入會員帳號及密碼與登入資料一致時，無論是否由本人親自輸入，均將推定為會員本人所使用，利用該密碼及帳號所進行的一切行動，會員本人應負完全責任。
          </p>
          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">會員同意以下事項：</p>
          <ul className="text-sm leading-relaxed mb-3 text-muted-foreground space-y-2 list-disc pl-5">
            <li>會員的密碼或帳號遭到盜用或有其他任何安全問題發生時，會員將立即通知 CMoney。</li>
            <li>每次連線完畢，均結束（登出）會員的帳號使用。</li>
            <li>會員的帳號、密碼及會員權益均僅供會員個人使用及享有，不得轉借、轉讓他人或與他人合用。</li>
            <li>帳號及密碼遭盜用、不當使用或其他 CMoney 無法辯識是否為本人親自使用之情況時，對此所致之損害，除證明係因可歸責於 CMoney 之事由所致，CMoney 將不負任何責任。</li>
            <li>CMoney 若知悉會員之帳號密碼確係遭他人冒用時，將立即暫停該帳號之使用（含該帳號所生交易之處理）。</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-base font-bold mb-3">五、兒童及青少年之保護</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            為確保兒童及青少年使用網路的安全，並避免隱私權受到侵犯，家長（或監護人）應盡到下列義務：未滿十二歲之兒童使用本服務時時，應全程在旁陪伴，十二歲以上未滿十八歲之青少年使用本服務前亦應斟酌是否給予同意。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-base font-bold mb-3">六、使用者的守法義務及承諾</h2>
          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            會員承諾絕不為任何非法目的或以任何非法方式使用本服務，並承諾遵守中華民國相關法規及一切使用網際網路之國際慣例。會員若係中華民國以外之使用者，並同意遵守所屬國家或地域之法令。會員同意並保證不得利用本服務從事侵害他人權益或違法之行為，包括但不限於：
          </p>
          <ul className="text-sm leading-relaxed mb-3 text-muted-foreground space-y-2 list-disc pl-5">
            <li>公布或傳送任何誹謗、侮辱、具威脅性、攻擊性、不雅、猥褻、不實、違反公共秩序或善良風俗或其他不法之文字、圖片或任何形式的檔案；</li>
            <li>侵害或毀損 CMoney 或他人名譽、隱私權、營業秘密、商標權、著作權、專利權、其他智慧財產權及其他權利；</li>
            <li>違反依法律或契約所應負之保密義務；</li>
            <li>冒用他人名義使用本服務、包括但不限於冒名註冊或擅自登入他人帳號；</li>
            <li>未經他人同意而擅自複製他人資訊轉售、轉載；</li>
            <li>傳輸或散佈電腦病毒；</li>
            <li>從事未經 CMoney 事前授權的商業行為；</li>
            <li>刊載、傳輸、發送垃圾郵件、連鎖信、違法或未經 CMoney 許可之多層次傳銷訊息及廣告等；或儲存任何侵害他人智慧財產權或違反法令之資料；</li>
            <li>對本服務其他用戶或第三人產生困擾、不悅或違反一般網路禮節致生反感之行為；</li>
            <li>其他不符本服務所提供的使用目的之行為或 CMoney 有正當理由認為不適當之行為。</li>
          </ul>
          <p className="text-sm leading-relaxed text-muted-foreground">
            會員如侵害他人權益或違法之行為，包括但不限於上述條列情況，CMoney 得以刪除相關資料如文字、圖片或檔案以及會員身分。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-base font-bold mb-3">七、服務內容之變更與宣傳廣告或行銷</h2>
          <ul className="text-sm leading-relaxed text-muted-foreground space-y-2 list-disc pl-5">
            <li>會員同意 CMoney 所提供本服務之範圍，CMoney 均得視業務需要及實際情形，增減、變更或終止相關服務的項目或內容，且無需個別通知會員。</li>
            <li>會員同意 CMoney 得依實際執行情形，增加、修改或終止相關活動，並選擇最適方式告知會員。</li>
            <li>會員同意 CMoney 得不定期提供會員各種商品或課程、講座、投資網誌等資訊至會員所登錄的電子信箱帳號。當會員收到訊息後表示拒絕接受行銷時，請與 CMoney 客服聯絡，我們將立即為您處理。</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-base font-bold mb-3">八、服務之停止、中斷</h2>
          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            CMoney 將依一般合理之技術及方式，維持系統及服務之正常運作。但於以下各項情況時，CMoney 有權可以停止、中斷提供本服務：
          </p>
          <ul className="text-sm leading-relaxed text-muted-foreground space-y-2 list-disc pl-5">
            <li>CMoney 網站電子通信設備進行必要之保養及施工時；</li>
            <li>發生突發性之電子通信設備故障時；</li>
            <li>CMoney 網站申請之電子通信服務被停止，無法提供服務時；</li>
            <li>由於天災等不可抗力之因素或其他不可歸責於 CMoney 致使 CMoney 網站無法提供服務時。</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-base font-bold mb-3">九、交易行為</h2>
          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            會員購買 CMoney 提供之付費商品時，應依據 CMoney 所提供之確認商品數量及價格機制進行。
          </p>
          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            會員購買 CMoney 提供之付費商品時，得依照消費者保護法之規定行使權利。因會員之交易行為而對本服務條款產生疑義時，應為有利於消費者之解釋，本公司有權根據實際情況對本服務條款進行修改，並在CMoney平台上公告。
          </p>
          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            根據消費者保護法之規定，在網路虛擬通路上購買的商品享有購買後七天猶豫期內（包含例假日）隨時解約退款之權益，但針對通訊交易有例外合理情事者（如報紙、期刊等具時效性之商品，或一經提供即完成之線上服務等），不適用前揭規定。故請您注意，在 CMoney 提供之線上數位內容（例如：影音課程、電子書、數據貓頭鷹等，資料傳輸服務商品）或具時效性之出版品，該商品不適用消保法 7 天猶豫期內可隨時解約退款之規定，故購買後即無法退貨，建議您在購買前應先行試用欲購買之商品。
          </p>
          <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
            CMoney 目前尚未提供直接換購其它商品之服務，請您見諒！
          </p>

          <h3 className="text-sm font-bold mb-2">付款類型說明</h3>
          <p className="text-sm leading-relaxed mb-2 text-muted-foreground">
            <strong>訂閱：</strong>僅限信用卡、Line Pay付款，對於訂閱項目，系統會在每個帳單週期 (可為每週、每月、每年或其他週期長度) 開始前 24 小時內自動向您收費。<strong>取消訂閱：</strong>在適用的帳單週期結束前，您隨時可以取消訂閱 (如說明中心所述)，系統會從下個帳單週期開始為您取消訂閱。舉例來說，如果您購買按月訂閱項目，可以在訂閱期間內隨時取消訂閱，系統會在您目前的帳單週期結束時為您取消訂閱該項目下個帳單週期，目前帳單週期的訂閱費用將不予退款。<strong>超商/ATM：</strong>僅提供非訂閱型項目付款。
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-xs border border-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="border border-border px-2 py-2 text-left font-medium">產品類型</th>
                  <th className="border border-border px-2 py-2 text-left font-medium">理財寶軟體/APP</th>
                  <th className="border border-border px-2 py-2 text-left font-medium">影音課程</th>
                  <th className="border border-border px-2 py-2 text-left font-medium">同學會專欄</th>
                  <th className="border border-border px-2 py-2 text-left font-medium">電子/紙本雜誌</th>
                  <th className="border border-border px-2 py-2 text-left font-medium">實體書籍</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-2 py-2 text-muted-foreground">付款方式</td>
                  <td className="border border-border px-2 py-2 text-muted-foreground">信用卡/ 超商/ ATM/ Line Pay</td>
                  <td className="border border-border px-2 py-2 text-muted-foreground">信用卡/ 超商/ ATM/ Line Pay</td>
                  <td className="border border-border px-2 py-2 text-muted-foreground">信用卡/ Line Pay</td>
                  <td className="border border-border px-2 py-2 text-muted-foreground">信用卡/ 超商/ ATM/ Line Pay</td>
                  <td className="border border-border px-2 py-2 text-muted-foreground">信用卡/ 超商/ ATM/ Line Pay</td>
                </tr>
                <tr>
                  <td className="border border-border px-2 py-2 text-muted-foreground">是否有提供自動續訂服務</td>
                  <td className="border border-border px-2 py-2 text-muted-foreground">是(限使用信用卡、Line Pay付費)</td>
                  <td className="border border-border px-2 py-2 text-muted-foreground">否</td>
                  <td className="border border-border px-2 py-2 text-muted-foreground">是(限使用信用卡、Line Pay付費)</td>
                  <td className="border border-border px-2 py-2 text-muted-foreground">是(限使用信用卡、Line Pay付費)</td>
                  <td className="border border-border px-2 py-2 text-muted-foreground">否</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm leading-relaxed mb-3 text-muted-foreground">
            <strong>付費產品之使用期間：</strong>係指CMoney平台會員依據其所訂閱/購買方式及其付款方式所得使用訂閱/購買內容之期間。
          </p>

          <div className="space-y-3 mb-3">
            <div>
              <h4 className="text-sm font-bold mb-2">【訂閱軟體服務者】：</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                訂閱者於CMoney平台選購之訂閱軟體服務方案，其僅為本公司授權訂閱者之訂閱服務使用權，亦即訂閱者僅得透過訂閱的APP或電腦產品使用該服務，除該付費訂閱方案另有約定外，訂閱者不因付費訂閱後而取得該方案之內容所有權。因此，訂閱者一經取消訂閱即無法再閱讀、觀看其之前所付費訂閱之方案贈送的影音/VIP文章。
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-2">【購買CMoney影音課程服務者】：</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                購買者於CMoney平台選購之影音課程服務方案，其僅為本公司授權購買者之影音課程服務使用權，亦即購買者僅得透過CMoney平台進行觀看該付費課程內容，購買者不因付費後而取得該影音課程之內容所有權。請注意：部分影音課程具有到期日，一旦影音課程達到到期日，您將無法再次觀看該影音課程。若無特別標示到期日，則該影音課程無到期限制。
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-2">【訂閱同學會專欄服務者】：</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                訂閱者於CMoney平台選購之訂閱同學會專欄方案，其僅為本公司授權訂閱者之訂閱服務使用權，亦即訂閱者僅得透過CMoney股市爆料同學會平台進行閱讀、觀看該付費訂閱方案，訂閱者不因付費訂閱後而取得該方案之內容所有權。因此，訂閱者一經取消訂閱即無法再閱讀、觀看其之前所付費訂閱之方案內容。
              </p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            本公司保留對本服務條款的最終解釋權。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-base font-bold mb-3">十、責任之限制與排除</h2>
          <ul className="text-sm leading-relaxed text-muted-foreground space-y-2 list-disc pl-5">
            <li>本服務所提供之各項功能，均依該功能當時之現況提供使用，CMoney 對於其效能、速度、完整性、可靠性、安全性、正確性等，皆不負擔任何明示或默示之擔保責任。</li>
            <li>CMoney 並不保證本服務之網頁、伺服器、網域等所傳送的電子郵件或其內容不會含有電腦病毒等有害物；亦不保證郵件、檔案或資料之傳輸儲存均正確無誤不會斷線和出錯等，因各該郵件、檔案或資料傳送或儲存失敗、遺失或錯誤等所致之損害，CMoney 不負賠償責任。</li>
            <li>CMoney 股市資料主要來源自台灣證券交易所 ( TWSE )，公開資訊觀測站及證券櫃檯買賣中心 ( OTC )。資訊用戶應遵守台灣證券交易所（TWSE）"交易資訊使用管理辦法"等相關規定。所有內容僅供參考，並無任何推介買賣之意，投資人應自行承擔交易風險，所有資訊仍應以台灣證券交易所及櫃檯買賣中心等資料來源所公告為準，CMoney 及相關權利人不負任何法律責任，投資人若依此以為買賣依據，須自負盈虧之責，一概與 CMoney 無關，特此聲明。</li>
            <li>本網站所供之所有文字、數據、資料與服務皆為輔助股市大富翁模擬交易訓練之工具及教材，絕無任何推介買賣之意，僅限作為教育訓練使用。請勿以此作為真實買賣交易之參考。</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-base font-bold mb-3">十一、智慧財產權的保護</h2>
          <ul className="text-sm leading-relaxed text-muted-foreground space-y-2 list-disc pl-5">
            <li>CMoney 網站內所有著作及資料均受著作權法相關法令保護，屬於 CMoney 及其權利人所有，未經合法授權請勿翻載。尊重智慧財產權是會員應盡的義務，如有違反，會員應對 CMoney 負損害賠償責任 ( 包括但不限於訴訟費用及律師費用等 )。</li>
            <li>在尊重他人智慧財產權之原則下，會員同意在使用 CMoney 之服務時，不為侵害他人智慧財產權之行為。</li>
            <li>若會員有涉及侵權之情事，CMoney 可暫停全部或部份之服務，或逕自以取消會員帳號之方式處理。</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-base font-bold mb-3">十二、會員對 CMoney 之授權</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            對於會員傳送、輸入或提供之資料，會員同意 CMoney 網站得於合理之範圍內蒐集、處理、保存、傳遞及使用該等資料，以提供使用者其他資訊或服務、或作成會員統計資料、或進行關於網路行為之調查或研究，或為任何之合法使用。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-base font-bold mb-3">十三、拒絕或終止會員的使用</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            會員同意 CMoney 得基於維護交易安全之考量，因任何理由，包含但不限於缺乏使用，或違反本服務條款的明文規定及精神，終止會員的密碼、帳號（或其任何部分）或本服務（或其任何部分）之使用，或將本服務內任何「會員內容」加以移除並刪除。此外，會員同意若本服務（或其任何部分）之使用被終止，CMoney 對會員或任何第三人均不承擔責任。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3">十四、準據法與管轄法院</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            本服務條款之解釋與適用，以及與本服務條款有關或會員與 CMoney 間因交易行為而產生之爭議或糾紛，應依照中華民國法律予以處理，並以台灣新北地方法院為第一審管轄法院，但若法律對於管轄法院另有強制規定者，仍應依其規定。
          </p>
        </section>
      </div>
    </div>
  );
}
