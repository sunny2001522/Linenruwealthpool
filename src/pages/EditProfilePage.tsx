import { useState } from "react";
import { ChevronLeft, User, Camera, Mail, Phone, Calendar, Save } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../lib/authContext";
import enruAvatar from "figma:asset/669abba4cb1cf3bf6bffdce61f40edd799d8b2f2.png";

export function EditProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || "vausb6xb0q",
    email: user?.email || "sonia_chen@cmoney.com.tw",
    phone: "+886 912-345-678",
    birthday: "1990-01-15",
    bio: "熱愛投資，追求財富自由",
    // 會員資料
    realName: "",
    gender: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    location: "",
    education: "",
    occupation: "",
    investmentExperience: "",
    investmentTools: [] as string[],
    investmentStyle: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以添加实际的保存逻辑
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/home/more");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/home/more")}
            className="w-10 h-10 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">編輯個人資料</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Section */}
          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={enruAvatar}
                  alt="Avatar"
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-primary/30 shadow-xl"
                />
                <button
                  type="button"
                  className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-primary hover:bg-primary/90 flex items-center justify-center shadow-lg transition-colors"
                >
                  <Camera className="w-5 h-5 text-black" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">點擊相機圖示更換頭像</p>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-lg">
            <div className="px-5 py-4 border-b border-border/50">
              <h3 className="font-bold text-sm text-muted-foreground">基本資料</h3>
            </div>
            <div className="p-5 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  姓名
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="請輸入姓名"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  電子信箱
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="請輸入電子信箱"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  手機號碼
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="請輸入手機號碼"
                />
              </div>

              {/* Birthday */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  生日
                </label>
                <input
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Member Information */}
          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-lg">
            <div className="px-5 py-4 border-b border-border/50">
              <h3 className="font-bold text-sm text-muted-foreground">修改會員資料</h3>
            </div>
            <div className="p-5 space-y-4">
              {/* Real Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  真實姓名
                </label>
                <input
                  type="text"
                  value={formData.realName}
                  onChange={(e) => setFormData({ ...formData, realName: e.target.value })}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="請輸入真實姓名"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  性別
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm">男</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm">女</span>
                  </label>
                </div>
              </div>

              {/* Birth Date */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  生日
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center gap-1">
                    <select
                      value={formData.birthYear}
                      onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                      className="flex-1 px-2 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                    >
                      <option value="">年</option>
                      {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <select
                      value={formData.birthMonth}
                      onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
                      className="flex-1 px-2 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                    >
                      <option value="">月</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <select
                      value={formData.birthDay}
                      onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
                      className="flex-1 px-2 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                    >
                      <option value="">日</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  居住地區
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="">請選擇...</option>
                  <option value="台北市">台北市</option>
                  <option value="新北市">新北市</option>
                  <option value="桃園市">桃園市</option>
                  <option value="台中市">台中市</option>
                  <option value="台南市">台南市</option>
                  <option value="高雄市">高雄市</option>
                  <option value="基隆市">基隆市</option>
                  <option value="新竹市">新竹市</option>
                  <option value="嘉義市">嘉義市</option>
                  <option value="新竹縣">新竹縣</option>
                  <option value="苗栗縣">苗栗縣</option>
                  <option value="彰化縣">彰化縣</option>
                  <option value="南投縣">南投縣</option>
                  <option value="雲林縣">雲林縣</option>
                  <option value="嘉義縣">嘉義縣</option>
                  <option value="屏東縣">屏東縣</option>
                  <option value="宜蘭縣">宜蘭縣</option>
                  <option value="花蓮縣">花蓮縣</option>
                  <option value="台東縣">台東縣</option>
                  <option value="澎湖縣">澎湖縣</option>
                  <option value="金門縣">金門縣</option>
                  <option value="連江縣">連江縣</option>
                </select>
              </div>

              {/* Education */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  教育程度
                </label>
                <select
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="">請選擇...</option>
                  <option value="國中以下">國中以下</option>
                  <option value="高中職">高中職</option>
                  <option value="專科">專科</option>
                  <option value="大學">大學</option>
                  <option value="碩士">碩士</option>
                  <option value="博士">博士</option>
                </select>
              </div>

              {/* Occupation */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  職業
                </label>
                <select
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="">請選擇...</option>
                  <option value="學生">學生</option>
                  <option value="軍公教">軍公教</option>
                  <option value="服務業">服務業</option>
                  <option value="製造業">製造業</option>
                  <option value="金融業">金融業</option>
                  <option value="科技業">科技業</option>
                  <option value="自由業">自由業</option>
                  <option value="家管">家管</option>
                  <option value="退休">退休</option>
                  <option value="其他">其他</option>
                </select>
              </div>

              {/* Investment Experience */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  投資經歷
                </label>
                <select
                  value={formData.investmentExperience}
                  onChange={(e) => setFormData({ ...formData, investmentExperience: e.target.value })}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="">請選擇...</option>
                  <option value="未滿1年">未滿1年</option>
                  <option value="1-3年">1-3年</option>
                  <option value="3-5年">3-5年</option>
                  <option value="5-10年">5-10年</option>
                  <option value="10年以上">10年以上</option>
                </select>
              </div>

              {/* Investment Tools */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  投資工具
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "stock", label: "股票" },
                    { value: "fund", label: "基金" },
                    { value: "futures", label: "期貨" },
                    { value: "option", label: "選擇權" },
                    { value: "forex", label: "外匯" },
                    { value: "gold", label: "黃金" },
                    { value: "deposit", label: "定存" },
                    { value: "realestate", label: "不動產" },
                  ].map((tool) => (
                    <label key={tool.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.investmentTools.includes(tool.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              investmentTools: [...formData.investmentTools, tool.value]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              investmentTools: formData.investmentTools.filter(t => t !== tool.value)
                            });
                          }
                        }}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-sm">{tool.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Investment Style */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  投資屬性
                </label>
                <select
                  value={formData.investmentStyle}
                  onChange={(e) => setFormData({ ...formData, investmentStyle: e.target.value })}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="">請選擇...</option>
                  <option value="保守型">保守型</option>
                  <option value="穩健型">穩健型</option>
                  <option value="積極型">積極型</option>
                  <option value="投機型">投機型</option>
                </select>
              </div>
            </div>
          </div>

        

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] hover:shadow-xl py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            儲存變更
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-card border border-border rounded-3xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Save className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">儲存成功！</h3>
            <p className="text-sm text-muted-foreground text-center">
              您的個人資料已更新
            </p>
          </div>
        </div>
      )}
    </div>
  );
}