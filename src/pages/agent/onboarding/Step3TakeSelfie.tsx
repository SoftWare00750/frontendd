import { useRef, useState, useEffect } from "react";
import { ArrowLeft, Info } from "lucide-react";

interface Props {
  next: () => void;
  prev: () => void;
  currentStep?: number;   // ← add this
  totalSteps?: number;    // ← add this
  onComplete: (complete: boolean) => void;
  isComplete: boolean;
}

export default function Step3Selfie({ next, prev, onComplete, isComplete }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  const startCamera = async () => {
    setCameraError(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraActive(true);
    } catch (error) {
      console.error("Camera access denied:", error);
      setCameraError(true);
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    setCameraActive(false);
  };

  useEffect(() => () => { stopCamera(); }, []);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx?.save();
    ctx?.translate(canvas.width, 0);
    ctx?.scale(-1, 1);
    ctx?.drawImage(video, 0, 0);
    ctx?.restore();
    const image = canvas.toDataURL("image/png");
    setPhoto(image);
    onComplete(true);
    stopCamera();
  };

  const retakePhoto = () => {
    setPhoto(null);
    onComplete(false);
    startCamera();
  };

  return (
    <div className="h-screen w-full flex flex-col px-5" style={{ backgroundColor: "#f0f7f0" }}>

      {/* Back Arrow */}
      <button
        onClick={prev}
        className="mt-4 mb-3 w-8 h-8 shrink-0 flex items-center justify-center rounded-full hover:bg-green-100 transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft size={20} className="text-green-900" strokeWidth={2.2} />
      </button>

      {/* Progress */}
      <div className="mb-4 shrink-0">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-500">
            Step <span className="text-green-600 font-semibold">3</span> of 5
          </p>
          <p className="text-sm font-semibold text-green-900">60%</p>
        </div>
        <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full rounded-full bg-green-500 transition-all duration-500" style={{ width: "60%" }} />
        </div>
      </div>

      {/* Heading */}
      <div className="mb-4 shrink-0">
        <h1 className="text-2xl font-bold text-green-900 mb-1">Upload Selfie</h1>
        <p className="text-sm text-gray-500 leading-snug">Take a clear selfie for identity verification</p>
      </div>

      {/* Camera Card */}
      <div className="bg-white rounded-2xl pt-4 pb-5 px-5 flex flex-col items-center shadow-sm shrink-0">
        <p className="text-sm font-semibold text-gray-800 self-start mb-3">Face Alignment Guide</p>

        {/* Oval frame */}
        <div className="relative flex items-center justify-center w-full mb-3" style={{ height: 200 }}>
          <div className="absolute" style={{ width: 228, height: 196, borderRadius: "50%", border: "1.5px solid rgba(134,199,134,0.35)", zIndex: 1 }} />
          <div className="absolute" style={{ width: 210, height: 180, borderRadius: "50%", background: "radial-gradient(ellipse at center, rgba(187,237,187,0.50) 50%, transparent 100%)", zIndex: 2 }} />
          <div className="absolute" style={{ width: 192, height: 164, borderRadius: "50%", border: "2.5px solid #22c55e", zIndex: 3 }} />
          <div className="relative overflow-hidden" style={{ width: 188, height: 160, borderRadius: "50%", background: "#f0f7f0", zIndex: 4 }}>
            {cameraActive && !photo && (
              <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
            )}
            {photo && (
              <img src={photo} alt="Captured selfie" className="absolute inset-0 w-full h-full object-cover" />
            )}
            {!cameraActive && !photo && (
              <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
                <svg viewBox="0 0 120 150" fill="none" style={{ width: 130, marginBottom: -8 }}>
                  <ellipse cx="60" cy="46" rx="27" ry="30" fill="#c8e6c9" />
                  <ellipse cx="60" cy="140" rx="50" ry="34" fill="#c8e6c9" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {cameraError && (
          <p className="text-xs text-red-500 mb-1 text-center px-2">
            Camera access was denied. Please allow camera permissions and try again.
          </p>
        )}

        {!photo ? (
          <p className="text-xs text-gray-500 text-center mb-1">Position your face within the oval guide.</p>
        ) : (
          <p className="text-xs text-green-600 font-medium text-center mb-1">Photo captured successfully!</p>
        )}

        {!cameraActive && !photo && (
          <button onClick={startCamera} className="mt-1 text-sm font-semibold text-green-700 underline underline-offset-2 hover:text-green-900 transition">
            Click to get started
          </button>
        )}
        {cameraActive && !photo && (
          <button onClick={capturePhoto} className="mt-2 bg-green-900 text-white text-sm font-semibold px-8 py-2 rounded-xl hover:bg-green-800 active:scale-95 transition-all">
            Capture
          </button>
        )}
        {photo && (
          <button onClick={retakePhoto} className="mt-2 border border-green-800 text-green-900 text-sm font-semibold px-8 py-2 rounded-xl hover:bg-green-50 active:scale-95 transition-all">
            Retake
          </button>
        )}
      </div>

      {/* Tips Card */}
      <div className="flex gap-3 rounded-xl p-3 mt-3 shrink-0" style={{ backgroundColor: "#f9fbdc" }}>
        <Info size={18} className="text-gray-500 shrink-0 mt-0.5" strokeWidth={1.8} />
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-1">Tips</p>
          <ul className="space-y-0.5">
            {["Remove glasses or face coverings", "Ensure good lighting", "Look directly at the camera"].map((tip) => (
              <li key={tip} className="text-xs text-gray-500 flex gap-1.5">
                <span className="mt-px">•</span><span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Continue — always visible, disabled until photo captured */}
      <div className="pb-8 pt-2 shrink-0">
        <button
          onClick={next}
          disabled={!isComplete}
          className={`w-full text-sm font-semibold py-4 rounded-2xl active:scale-[0.98] transition-all duration-150
            ${isComplete
              ? "bg-green-900 text-white hover:bg-green-800 shadow-md shadow-green-900/20 cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}