import { FileText, Hand, Sparkles, Star, Video } from "lucide-react";
import type React from "react";
import { useState } from "react";
import SpecialServiceBookingForm, {
  VIDEO_PREDICTION_SERVICE_ID,
  WRITTEN_PREDICTION_SERVICE_ID,
} from "./SpecialServiceBookingForm";

type ServiceType = "Video Prediction" | "Written Prediction";

interface SpecialService {
  id: number;
  type: ServiceType;
  icon: React.ReactNode;
  title: string;
  shortDesc: string;
  fee: number;
}

const specialServices: SpecialService[] = [
  {
    id: VIDEO_PREDICTION_SERVICE_ID,
    type: "Video Prediction",
    icon: <Video size={26} />,
    title: "Video Prediction",
    shortDesc:
      "Receive a personalised video reading covering your full nature prediction, 10-year career advice, and guidance on relationship difficulties — our expert analyses your palm lines and numerology to deliver deep, life-changing insights directly to you.",
    fee: 2500,
  },
  {
    id: WRITTEN_PREDICTION_SERVICE_ID,
    type: "Written Prediction",
    icon: <FileText size={26} />,
    title: "Written Prediction",
    shortDesc:
      "Get a comprehensive written report with your full nature prediction, a detailed 10-year career roadmap, and in-depth guidance on relationship difficulties — covering financials, family, and every key dimension of your life in rich, actionable detail.",
    fee: 2500,
  },
];

const includedFeatures = [
  "Full nature & personality prediction",
  "10-year career advice & roadmap",
  "Relationship difficulty guidance",
  "Financial & family outlook",
  "Palmistry + Numerology combined",
];

export default function SpecialUniqueServiceSection() {
  const [activeModal, setActiveModal] = useState<{
    type: ServiceType;
    id: number;
  } | null>(null);

  return (
    <div
      id="special-services"
      className="py-20 px-4 relative overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="celestial-divider w-12" />
            <Sparkles
              size={14}
              style={{ color: "#c8a96e" }}
              fill="currentColor"
            />
            <div className="celestial-divider w-12" />
          </div>
          <h2 className="section-heading" style={{ color: "#e5e0d5" }}>
            Unique Way to Prediction
          </h2>
          <div className="max-w-3xl mx-auto mt-6 space-y-3">
            <p
              className="leading-relaxed text-base text-center"
              style={{ color: "#c5c0b5" }}
            >
              Through the ancient sciences of{" "}
              <span style={{ fontWeight: 700, color: "#c8a96e" }}>
                Palmistry
              </span>{" "}
              and{" "}
              <span style={{ fontWeight: 700, color: "#c8a96e" }}>
                Numerology
              </span>
              , we reveal the deepest truths of your nature — your strengths,
              hidden patterns, and the unique blueprint of your soul.
            </p>
            <p
              className="leading-relaxed text-base text-center"
              style={{ color: "#a09888" }}
            >
              Beyond understanding who you are, we predict and advise on the
              future challenges and opportunities across every dimension of your
              life:{" "}
              <span style={{ fontWeight: 600, color: "#c5c0b5" }}>
                Finances &amp; Wealth
              </span>
              ,{" "}
              <span style={{ fontWeight: 600, color: "#c5c0b5" }}>
                Relationships &amp; Love
              </span>
              , and{" "}
              <span style={{ fontWeight: 600, color: "#c5c0b5" }}>
                Family &amp; Home
              </span>{" "}
              — everything in rich, actionable detail so you can navigate your
              path with clarity and confidence.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <Hand size={15} style={{ color: "rgba(200,169,110,0.7)" }} />
              <p className="text-sm italic" style={{ color: "#7a7a7a" }}>
                Share your palm photos, birth details, and your deepest
                questions — we'll do the rest.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {specialServices.map((service, i) => (
            <div
              key={service.id}
              className="card-hover rounded-2xl border-2 p-7 flex flex-col shadow-spiritual"
              style={{ background: "#1a1a1a", borderColor: "#3a3a3a" }}
              data-ocid={`special_services.item.${i + 1}`}
            >
              <div className="mb-5">
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border"
                  style={{
                    background: "#2a1f0a",
                    color: "#c8a96e",
                    borderColor: "#4a3a1a",
                  }}
                >
                  {service.type}
                </span>
              </div>
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm"
                  style={{
                    background: "#222",
                    border: "1px solid rgba(200,169,110,0.3)",
                    color: "#c8a96e",
                  }}
                >
                  {service.icon}
                </div>
                <div className="text-right">
                  <div
                    className="font-serif text-3xl font-bold"
                    style={{ color: "#c8a96e" }}
                  >
                    ₹{service.fee.toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#7a7a7a" }}>
                    per session
                  </div>
                </div>
              </div>
              <h3
                className="font-serif text-2xl font-semibold mb-3"
                style={{ color: "#e5e0d5" }}
              >
                {service.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "#a09888" }}
              >
                {service.shortDesc}
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {includedFeatures.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "#b0a898" }}
                  >
                    <Star
                      size={12}
                      style={{ color: "#c8a96e", flexShrink: 0 }}
                      fill="currentColor"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() =>
                  setActiveModal({ type: service.type, id: service.id })
                }
                className="text-sm w-full py-3 font-medium rounded-xl transition-colors"
                style={{
                  background: "#c8a96e",
                  color: "#0d0d0d",
                  fontWeight: 600,
                }}
                data-ocid={`special_services.book_button.${i + 1}`}
              >
                Book / Inquire
              </button>
            </div>
          ))}
        </div>
      </div>

      {activeModal && (
        <SpecialServiceBookingForm
          open={!!activeModal}
          onClose={() => setActiveModal(null)}
          serviceType={activeModal.type}
          serviceId={activeModal.id}
        />
      )}
    </div>
  );
}
