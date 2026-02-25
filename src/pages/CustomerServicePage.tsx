import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { CUSTOMER_SERVICE_URL } from "../lib/appConfig";

export function CustomerServicePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center gap-4 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-muted rounded-full transition-colors -ml-2"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold">線上客服</h1>
        </div>
      </div>

      {/* Embedded Web Content */}
      <div className="flex-1">
        <iframe
          src={CUSTOMER_SERVICE_URL}
          className="w-full h-full border-0"
          title="線上客服"
        />
      </div>
    </div>
  );
}
