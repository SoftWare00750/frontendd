export default function Home() {
  return (
    <div className="bg-[#F2FDF5] min-w-screen min-h-screen absolute left-[100px] top-[200px] overflow-hidden">
      <div className="flex py-8 px-[50px] justify-center items-start gap-[762px] border-b border-b-[rgba(0,0,0,0.10)] w-full absolute left-0 top-0">
        <button className="cursor-pointer text-nowrap flex justify-center items-center w-fit">
          <div className="flex p-[5px] flex-col items-start gap-2.5 w-fit overflow-hidden">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 relative "
            >
              <path
                d="M31.5318 28.6402L25.2502 22.36L25.8766 20.0962L23.1096 17.3285L24.7178 15.7204C26.326 14.1108 26.326 11.478 24.7178 9.86913L18.023 3.17432C18.023 3.17432 18.7774 2.41994 19.7013 1.49602C20.6232 0.574148 19.7919 -0.0951284 17.8508 0.0110844L4.46182 0.742318C2.52139 0.848531 0.847179 2.52274 0.741647 4.46385L0.0110937 17.8494C-0.095119 19.7905 0.573477 20.6225 1.49603 19.7006C2.41858 18.7787 3.17433 18.0244 3.17433 18.0244L9.86982 24.7178C11.478 26.326 14.1108 26.3273 15.7204 24.7178L17.3299 23.1083L19.2778 25.0548L21.543 24.4305L22.6351 25.5219L23.6536 25.1794L24.5544 26.0802L24.054 26.9421L24.6402 27.527L25.6581 27.1818L26.5588 28.0853L26.0584 28.9466L28.6409 31.5304C28.9153 31.8048 29.4579 32.0152 29.8467 31.9981L31.2002 31.9369C31.5883 31.9199 31.9205 31.5869 31.9382 31.1995L31.9995 29.8473C32.0159 29.4586 31.8055 28.9153 31.5318 28.6402ZM14.0591 7.25057L16.9071 10.0993L14.0598 12.9479L11.2118 10.0993L14.0591 7.25057ZM7.25126 14.0577L10.0999 11.2084L12.9479 14.057L10.0999 16.9057L7.25126 14.0577ZM14.0591 20.8649L11.2111 18.0155L14.0591 15.1689L16.9071 18.0155L14.0591 20.8649ZM18.0169 16.9064L15.1702 14.0584L18.0169 11.209L20.8662 14.0577L18.0169 16.9064Z"
                fill="#014421"
              />
            </svg>
          </div>
          <p className="text-[#014421] font-instrumentSerif text-xl leading-10 w-fit tracking-[-0.025em]">
            OGALandlord
          </p>
        </button>
      </div>
      <div className="flex flex-col items-center gap-[54px] w-[1340px] absolute left-[50px] top-[178px]">
        <div className="flex flex-col items-center gap-[13px] w-[1340px]">
          <div className="flex flex-col items-center gap-[54px] w-full">
            <div className="flex flex-col items-center gap-7 w-[910px]">
              <p className="text-[#014421] font-interTight text-6xl font-semibold leading-[65px] w-[731px] text-center tracking-[-0.0167em]">
                A Safer Way to Rent Is Launching Soon
              </p>
              <button className="cursor-pointer text-nowrap flex justify-center items-center w-[364px] h-[27px]">
                <p className="text-[#262626] font-interTight text-lg leading-[27px] w-[744px] h-[27px] text-center tracking-[-0.0278em]">
                  Be the first to access verified listings, trusted agents, and
                  tools designed to help you avoid rental scams.
                </p>
              </button>
              <div className="flex justify-center items-center w-[550px] h-[67px]">
                <div className="flex py-1.5 px-2 justify-center items-center shrink-0 rounded-[100px] border border-[rgba(0,0,0,0.20)] bg-[#FFF] w-[550px] h-[67px] overflow-hidden">
                  <div className="flex pl-3 justify-end items-center gap-[244px] shrink-0 w-[534px] h-[55px]">
                    <p className="text-[#525252] font-interTight text-base leading-[27px] w-[104px] h-[27px] text-center tracking-[-0.0313em]">
                      Enter Your Email
                    </p>
                    <div className="flex py-[15px] px-[150px] justify-center items-center gap-2.5 rounded-[100px] bg-[#014421] w-[174px] h-[55px]">
                      <button className="cursor-pointer text-nowrap flex justify-center items-center gap-[7px] w-fit">
                        <p className="text-[#F9FFE3] font-interTight text-sm font-medium w-[74px]">
                          Join Waitlist
                        </p>
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 17 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[17px] h-[17px] overflow-hidden relative "
                        >
                          <path
                            d="M3 8.3183V6.90164L11.5 6.90164L7.60417 3.0058L8.61 1.99997L14.22 7.60997L8.61 13.22L7.60417 12.2141L11.5 8.3183L3 8.3183Z"
                            fill="#F9FFE3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-[#737373] font-interTight text-base leading-[27px] w-full text-center tracking-[-0.0313em]">
            89 People Joined
          </p>
        </div>
        <div className="flex justify-between items-center w-full">
          <img
            src="/Image.png"
            className="rounded-[15px] w-[516px] h-[505px] max-w-none"
            alt="image"
          />
          <div className="flex flex-col items-start gap-5 w-[804px]">
            <div className="flex items-center gap-5 w-full">
              <div className="flex pt-[61px] pr-[41px] pb-[75px] pl-10 justify-center items-center rounded-[15px] bg-[#014421] w-[392px] h-[223px] overflow-hidden">
                <div className="flex flex-col items-start -space-y-[9px] shrink-0 w-[311px]">
                  <div className="flex p-3 justify-center items-center rounded-lg bg-[#F9FFE3] w-full h-12 overflow-hidden">
                    <div className="flex items-center gap-[61px] w-[287px] h-6">
                      <p className="text-[#014421] font-interTight text-base leading-6 w-fit">
                        Agent verified in Bodija
                      </p>
                      <div className="flex py-1 px-2 justify-center items-center shrink-0 rounded-2xl bg-[#E2FBE8] w-[69px]">
                        <div className="flex flex-col items-center w-fit">
                          <p className="text-[#3EA34B] font-interTight text-[10px] leading-3 w-fit tracking-[0.1em]">
                            2min ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex pt-3 pr-2.5 pb-3 pl-3 justify-center items-center rounded-lg bg-[#F9FFE3] shadow-[4px040px0rgba(0,0,0,0.15)] w-full h-12 overflow-hidden">
                    <button className="cursor-pointer text-nowrap flex justify-center items-center gap-3 w-[289px]">
                      <p className="text-[#014421] font-interTight text-base leading-6 w-52 text-center">
                        Inspection confirmed in Akobo
                      </p>
                      <div className="flex py-1 px-2 justify-center items-center rounded-2xl bg-[#E2FBE8] w-[69px]">
                        <div className="flex flex-col items-center w-fit">
                          <p className="text-[#3EA34B] font-interTight text-[10px] leading-3 w-fit tracking-[0.1em]">
                            2min ago
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex pt-[57px] pr-0 pb-14 pl-0 justify-center items-center rounded-[15px] bg-[#014421] w-[392px] h-[223px] overflow-hidden">
                <div className="flex p-[13px] flex-col items-start gap-[26px] bg-[#014421] w-fit overflow-hidden">
                  <svg
                    width="84"
                    height="84"
                    viewBox="0 0 84 84"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[84px] h-[84px] relative "
                  >
                    <path
                      d="M82.5824 75.0093L66.1309 58.5614L67.7715 52.6324L60.5247 45.3838L64.7365 41.172C68.9483 36.9566 68.9483 30.0611 64.7365 25.8475L47.2027 8.31361C47.2027 8.31361 49.1784 6.33786 51.5982 3.91811C54.0126 1.50371 51.8353 -0.249143 46.7515 0.0290302L11.6856 1.94415C6.60358 2.22232 2.21878 6.60712 1.94239 11.6909L0.0290547 46.7479C-0.249119 51.8317 1.50195 54.0108 3.91814 51.5964C6.33432 49.1819 8.31363 47.2062 8.31363 47.2062L25.8493 64.7365C30.0611 68.9483 36.9566 68.9519 41.172 64.7365L45.3874 60.5211L50.489 65.6191L56.4216 63.984L59.2818 66.8424L61.9494 65.9455L64.3085 68.3046L62.9979 70.5621L64.5332 72.0938L67.1991 71.1898L69.5582 73.556L68.2476 75.8117L75.0111 82.5788C75.7297 83.2974 77.1509 83.8484 78.1691 83.8039L81.714 83.6434C82.7304 83.5988 83.6006 82.7268 83.647 81.7122L83.8074 78.1708C83.8502 77.1527 83.2992 75.7297 82.5824 75.0093ZM36.8211 18.9894L44.2801 26.4502L36.8229 33.9109L29.3639 26.4502L36.8211 18.9894ZM18.9912 36.8175L26.452 29.3549L33.911 36.8157L26.452 44.2765L18.9912 36.8175ZM36.8211 54.6456L29.3621 47.183L36.8211 39.7276L44.2801 47.183L36.8211 54.6456ZM47.1866 44.2782L39.7312 36.8193L47.1866 29.3567L54.6491 36.8175L47.1866 44.2782Z"
                      fill="#F9FFE3"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="rounded-[15px] bg-[#014421] w-[804px] h-[262px] overflow-hidden relative">
              <img
                src="/Image4.png"
                className="rounded-[4.7px] w-[681px] h-[484px] absolute left-[61px] top-[35px] max-w-none"
                alt="image 4"
              />
              <img
                src="/Image2.png"
                className="rounded-[4.7px] w-[708px] h-[504px] absolute left-[47px] top-[75px] max-w-none"
                alt="image 2"
              />
              <img
                src="/Image3.png"
                className="rounded-[4.7px] w-[734px] h-[522px] absolute left-[35px] top-[115px] max-w-none"
                alt="image 3"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-5 w-[1340px] absolute left-[50px] top-[1157px]">
        <div className="flex flex-col items-start gap-5 w-[480px]">
          <div className="flex justify-end items-center w-[277px] h-[53px]">
            <p className="text-[#014421] font-instrumentSerif text-[40px] leading-[55px] w-[479px] h-[133px] tracking-[-0.025em]">
              Why OgaLanlord
            </p>
          </div>
          <button className="cursor-pointer text-nowrap flex justify-center items-center w-full h-[54px]">
            <p className="text-[#262626] font-interTight text-lg leading-[27px] w-[482px] h-[54px] tracking-[-0.0278em]">
              We remove the guesswork from house hunting by verifying agents and
              protecting tenants at every step.
            </p>
          </button>
        </div>
        <div className="flex items-center gap-5 w-full">
          <div className="flex pt-[30px] pr-8 pb-[30px] pl-[25px] items-center rounded-[15px] border border-[rgba(0,0,0,0.10)] bg-[#FFF] w-full h-[382px] overflow-hidden">
            <div className="flex flex-col items-start gap-[169px] w-[376px]">
              <div className="flex py-3 px-[17px] justify-center items-center gap-2.5 rounded-md bg-[#014421] w-[60px] h-[60px] overflow-hidden">
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 w-11 h-11 overflow-hidden relative "
                >
                  <path
                    d="M21.9929 5.04187C27.7388 9.82389 34.3283 9.6252 36.2109 9.6252C35.799 36.8218 32.7734 31.396 21.9929 38.9585C11.2317 31.396 8.20623 36.8218 7.79419 9.6252C9.65731 9.6252 16.2465 9.82389 21.9929 5.04187Z"
                    stroke="white"
                    strokeWidth="2.75"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start gap-[9px] w-full">
                <p className="flex flex-col justify-center text-[#014421] font-interTight text-3xl font-medium leading-[30px] w-full h-9 tracking-[-0.01em]">
                  Verified Agents
                </p>
                <div className="flex pt-px pr-[9px] pb-px pl-0 items-center w-full h-12">
                  <p className="flex flex-col justify-center text-[#525252] font-interTight text-base leading-[23px] w-[367px] h-[46px] tracking-[-0.005em]">
                    Every agent is checked for identity, location, and rental
                    history before approval.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex pt-[30px] pr-8 pb-[30px] pl-[25px] items-center rounded-[15px] border border-[rgba(0,0,0,0.10)] bg-[#FFF] w-full h-[382px] overflow-hidden">
            <div className="flex flex-col items-start gap-[169px] w-[376px]">
              <div className="flex py-3 px-[17px] justify-center items-center gap-2.5 rounded-md bg-[#014421] w-[60px] h-[60px] overflow-hidden">
                <div className="shrink-0 w-11 h-11 overflow-hidden relative">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[26px] h-[26px] absolute left-[9px] top-[9px] "
                  >
                    <path
                      d="M27.4999 1.83337L1.83325 27.5"
                      stroke="white"
                      strokeWidth="3.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[9px] h-[9px] absolute left-[7px] top-[7px] "
                  >
                    <path
                      d="M6.41658 11C8.94789 11 10.9999 8.94801 10.9999 6.41671C10.9999 3.8854 8.94789 1.83337 6.41658 1.83337C3.88528 1.83337 1.83325 3.8854 1.83325 6.41671C1.83325 8.94801 3.88528 11 6.41658 11Z"
                      stroke="white"
                      strokeWidth="3.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[9px] h-[9px] absolute left-7 top-7 "
                  >
                    <path
                      d="M6.41658 11C8.94789 11 10.9999 8.94801 10.9999 6.41671C10.9999 3.8854 8.94789 1.83337 6.41658 1.83337C3.88528 1.83337 1.83325 3.8854 1.83325 6.41671C1.83325 8.94801 3.88528 11 6.41658 11Z"
                      stroke="white"
                      strokeWidth="3.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-start gap-[9px] w-full">
                <p className="flex flex-col justify-center text-[#014421] font-interTight text-3xl font-medium leading-[30px] w-full h-9 tracking-[-0.01em]">
                  Trust Scores
                </p>
                <div className="flex pt-px pr-[9px] pb-px pl-0 items-center w-full h-12">
                  <p className="flex flex-col justify-center text-[#525252] font-interTight text-base leading-[23px] w-[367px] h-[46px] tracking-[-0.005em]">
                    Agents earn trust scores based on verification status and
                    tenant feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex pt-[30px] pr-8 pb-[30px] pl-[25px] items-center rounded-[15px] border border-[rgba(0,0,0,0.10)] bg-[#FFF] w-full h-[382px] overflow-hidden">
            <div className="flex flex-col items-start gap-[169px] w-[376px]">
              <div className="flex py-3 px-[17px] justify-center items-center gap-2.5 rounded-md bg-[#014421] w-[60px] h-[60px] overflow-hidden">
                <div className="shrink-0 w-[42px] h-[42px] overflow-hidden relative">
                  <svg
                    width="32"
                    height="39"
                    viewBox="0 0 32 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-[35px] absolute left-[7px] top-[3px] "
                  >
                    <path
                      d="M5.25 36.75C4.32174 36.75 3.4315 36.3813 2.77513 35.7249C2.11875 35.0685 1.75 34.1783 1.75 33.25V5.25001C1.75 4.32175 2.11875 3.43151 2.77513 2.77513C3.4315 2.11875 4.32174 1.75001 5.25 1.75001H19.25C19.804 1.74911 20.3526 1.85781 20.8644 2.06985C21.3762 2.28189 21.841 2.59308 22.232 2.98551L28.511 9.26451C28.9045 9.65564 29.2166 10.1209 29.4292 10.6333C29.6419 11.1457 29.7509 11.6952 29.75 12.25V33.25C29.75 34.1783 29.3813 35.0685 28.7249 35.7249C28.0685 36.3813 27.1783 36.75 26.25 36.75H5.25Z"
                      stroke="white"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[11px] h-[11px] absolute left-[25px] top-[3px] "
                  >
                    <path
                      d="M1.75 1.75V10.5C1.75 10.9641 1.93437 11.4092 2.26256 11.7374C2.59075 12.0656 3.03587 12.25 3.5 12.25H12.25"
                      stroke="white"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    width="7"
                    height="4"
                    viewBox="0 0 7 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-1 absolute left-3.5 top-4 "
                  >
                    <path
                      d="M5.25 1.75H1.75"
                      stroke="white"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    width="18"
                    height="4"
                    viewBox="0 0 18 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 absolute left-3.5 top-[23px] "
                  >
                    <path
                      d="M15.75 1.75H1.75"
                      stroke="white"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    width="18"
                    height="4"
                    viewBox="0 0 18 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 absolute left-3.5 top-[30px] "
                  >
                    <path
                      d="M15.75 1.75H1.75"
                      stroke="white"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-start gap-[9px] w-full">
                <p className="flex flex-col justify-center text-[#014421] font-interTight text-3xl font-medium leading-[30px] w-full h-9 tracking-[-0.01em]">
                  Community Reporting
                </p>
                <div className="flex pt-px pr-[9px] pb-px pl-0 items-center w-full h-12">
                  <p className="flex flex-col justify-center text-[#525252] font-interTight text-base leading-[23px] w-[367px] h-[46px] tracking-[-0.005em]">
                    Real reports from tenants help flag fake agents and risky
                    listings early.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-5 w-[1340px] absolute left-[50px] top-[1787px]">
        <div className="flex flex-col items-start gap-5 w-[480px]">
          <div className="flex justify-end items-center w-[246px] h-[50px]">
            <p className="text-[#014421] font-interTight text-[40px] font-semibold leading-[55px] w-[479px] h-[133px] tracking-[-0.025em]">
              How It Works
            </p>
          </div>
          <div className="flex pr-[66px] items-center w-full h-[54px]">
            <p className="text-[#262626] font-interTight text-lg leading-[27px] w-[414px] h-[54px] tracking-[-0.0278em]">
              Follow a clear step-by-step process from agent selection to
              inspection.
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <img
            src="/A702420602ed402eb6ddef6d3a4826a51.png"
            className="rounded-[15px] w-[645px] h-[527px] max-w-none"
            alt="a7024206-02ed-402e-b6dd-ef6d3a4826a5 1"
          />
          <div className="flex flex-col items-start gap-[13px] w-[657px]">
            <div className="flex pt-[13px] pr-[281px] pb-0 pl-0 flex-col justify-end items-start gap-[50px] border-t border-t-[rgba(0,0,0,0.10)] w-full h-[167px] overflow-hidden">
              <div className="flex flex-col items-start gap-[9px] w-[376px]">
                <p className="flex flex-col justify-center text-[#014421] font-interTight text-xl font-medium leading-[30px] w-full h-[30px] tracking-[-0.01em]">
                  Agent Verification
                </p>
                <div className="flex pt-px pr-[9px] pb-px pl-0 items-center w-full h-12">
                  <p className="flex flex-col justify-center text-[#525252] font-interTight text-base leading-[23px] w-[367px] h-[46px] tracking-[-0.005em]">
                    Agents earn trust scores based on verification status and
                    tenant feedback.
                  </p>
                </div>
              </div>
              <p className="flex flex-col justify-center text-[#014421] font-interTight text-[15px] font-light leading-[30px] w-3.5 h-[17px] tracking-[-0.01em]">
                01
              </p>
            </div>
            <div className="flex pt-[13px] pr-[281px] pb-0 pl-0 flex-col justify-end items-start gap-[50px] border-t border-t-[rgba(0,0,0,0.10)] w-full h-[167px] overflow-hidden">
              <div className="flex flex-col items-start gap-[9px] w-[376px]">
                <p className="flex flex-col justify-center text-[#014421] font-interTight text-xl font-medium leading-[30px] w-full h-[30px] tracking-[-0.01em]">
                  Listings Upload
                </p>
                <div className="flex pt-[13px] pr-[9px] pb-3 pl-0 items-center w-full h-12">
                  <p className="flex flex-col justify-center text-[#525252] font-interTight text-base leading-[23px] w-[367px] h-[23px] tracking-[-0.005em]">
                    Connect with verified rental agents you can trust.
                  </p>
                </div>
              </div>
              <p className="flex flex-col justify-center text-[#014421] font-interTight text-[15px] font-light leading-[30px] w-[18px] h-[17px] tracking-[-0.01em]">
                02
              </p>
            </div>
            <div className="flex pt-[13px] pr-[281px] pb-0 pl-0 flex-col justify-end items-start gap-[50px] border-t border-t-[rgba(0,0,0,0.10)] w-full h-[167px] overflow-hidden">
              <div className="flex flex-col items-start gap-[9px] w-[376px]">
                <p className="flex flex-col justify-center text-[#014421] font-interTight text-xl font-medium leading-[30px] w-full h-[30px] tracking-[-0.01em]">
                  Safe Contact
                </p>
                <div className="flex pt-px pr-[9px] pb-px pl-0 items-center w-full h-12">
                  <p className="flex flex-col justify-center text-[#525252] font-interTight text-base leading-[23px] w-[367px] h-[46px] tracking-[-0.005em]">
                    Agents earn trust scores based on verification status and
                    tenant feedback.
                  </p>
                </div>
              </div>
              <p className="flex flex-col justify-center text-[#014421] font-interTight text-[15px] font-light leading-[30px] w-[18px] h-[17px] tracking-[-0.01em]">
                03
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#014421] w-full h-[635px] absolute left-0 top-[4415px] overflow-hidden">
        <div className="flex justify-between items-start w-[1240px] absolute left-[100px] top-[108px]">
          <div className="flex items-center gap-2.5 shrink-0 w-[152px] h-12">
            <button className="cursor-pointer text-nowrap flex justify-center items-center w-fit">
              <div className="flex p-[5px] flex-col items-start gap-2.5 w-fit overflow-hidden">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 relative "
                >
                  <path
                    d="M31.5318 28.6402L25.2502 22.36L25.8766 20.0962L23.1096 17.3285L24.7178 15.7204C26.326 14.1108 26.326 11.478 24.7178 9.86913L18.023 3.17432C18.023 3.17432 18.7774 2.41994 19.7013 1.49602C20.6232 0.574148 19.7919 -0.0951284 17.8508 0.0110844L4.46182 0.742318C2.52139 0.848531 0.847179 2.52274 0.741647 4.46385L0.0110937 17.8494C-0.095119 19.7905 0.573477 20.6225 1.49603 19.7006C2.41858 18.7787 3.17433 18.0244 3.17433 18.0244L9.86982 24.7178C11.478 26.326 14.1108 26.3273 15.7204 24.7178L17.3299 23.1083L19.2778 25.0548L21.543 24.4305L22.6351 25.5219L23.6536 25.1794L24.5544 26.0802L24.054 26.9421L24.6402 27.527L25.6581 27.1818L26.5588 28.0853L26.0584 28.9466L28.6409 31.5304C28.9153 31.8048 29.4579 32.0152 29.8467 31.9981L31.2002 31.9369C31.5883 31.9199 31.9205 31.5869 31.9382 31.1995L31.9995 29.8473C32.0159 29.4586 31.8055 28.9153 31.5318 28.6402ZM14.0591 7.25057L16.9071 10.0993L14.0598 12.9479L11.2118 10.0993L14.0591 7.25057ZM7.25126 14.0577L10.0999 11.2084L12.9479 14.057L10.0999 16.9057L7.25126 14.0577ZM14.0591 20.8649L11.2111 18.0155L14.0591 15.1689L16.9071 18.0155L14.0591 20.8649ZM18.0169 16.9064L15.1702 14.0584L18.0169 11.209L20.8662 14.0577L18.0169 16.9064Z"
                    fill="#F9FFE3"
                  />
                </svg>
              </div>
              <p className="text-[#F9FFE3] font-instrumentSerif text-xl leading-10 w-fit tracking-[-0.025em]">
                OGALandlord
              </p>
            </button>
          </div>
          <div className="flex flex-col items-start gap-2 shrink-0 w-[422px]">
            <p className="text-[#F9FFE3] font-interTight text-xl leading-[1.4em] w-full tracking-[-0.02em]">
              Subscribe to our newsletter
            </p>
            <button className="cursor-pointer text-nowrap flex pt-1.5 pr-1.5 pb-1.5 pl-[17px] justify-center items-center gap-2.5 rounded-[46px] border border-[rgba(255,255,255,0.10)] bg-[#F7F8F8] w-full">
              <p className="text-[#606060] font-interTight text-lg leading-6 w-full">
                Enter your email
              </p>
              <div className="flex py-3.5 px-4 justify-center items-center gap-2 rounded-[100px] bg-[#014421] shadow-[01px3px0rgba(16,24,40,0.07)] w-[50px] h-[50px] overflow-hidden">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 w-6 h-6 overflow-hidden relative "
                >
                  <path
                    d="M4 11.0001V13.0001H16L10.5 18.5001L11.92 19.9201L19.84 12.0001L11.92 4.08008L10.5 5.50008L16 11.0001H4Z"
                    fill="#F9FFE3"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
        <div className="flex pt-4 justify-between items-center border-t border-t-[#E5E5E5] w-[1240px] absolute left-[94px] top-[340px]">
          <p className="text-[#FFF] font-interTight text-base w-fit">
            © COPYRIGHT 2026 OGALANDLORD
          </p>
        </div>
        <p className="font-interTight text-[229px] font-bold leading-[326.85px] bg-linear-[0deg,rgba(255,255,255,0.300%,rgba(195,193,193,0.30)100%)] w-[1240px] h-[259px] absolute left-[94px] top-[376px] tracking-[-0.0179em]">
          OGALandlord
        </p>
      </div>
      <button className="cursor-pointer text-nowrap flex pt-[22px] pr-1.5 pb-[22px] pl-0 justify-center items-center gap-2.5 rounded-[10px] border border-[rgba(255,255,255,0.50)] bg-[rgba(255,255,255,0.30)] w-[599px] absolute left-[73px] top-[2349px]">
        <p className="shrink-0 text-[#FFF] font-interTight text-lg leading-6 w-[575px]">
          Tour properties with verified agents and avoid the risks that come
          with unverified listings.
        </p>
      </button>
      <div className="flex justify-between items-start w-[1340px] absolute left-[50px] top-[3857px]">
        <div className="flex flex-col items-start gap-[27px] shrink-0 w-[501px] h-[143px]">
          <div className="flex pr-[57px] items-center w-full h-[82px]">
            <p className="text-[#014421] font-interTight text-[40px] font-semibold leading-[45px] w-[444px] h-[158px] tracking-[-0.025em]">
              Frequently Asked Questions
            </p>
          </div>
          <div className="flex justify-end items-center shrink-0 w-full h-[27px]">
            <p className="text-[#262626] font-interTight text-lg leading-[27px] w-[610px] h-[27px] tracking-[-0.0278em]">
              If there are question you want to ask. We will answer all your
              question.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3.5 shrink-0 w-[666px]">
          <div className="flex p-6 flex-col items-start gap-[17px] rounded-lg border border-[#E5E5E5] bg-[#FFF] w-full h-[172px]">
            <div className="flex justify-between items-center w-full">
              <p className="text-[#12161D] font-interTight text-2xl font-medium leading-8 w-fit tracking-[-0.01em]">
                What does “Verified Agent” mean?
              </p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 overflow-hidden relative "
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.25 12C4.25 11.5858 4.58579 11.25 5 11.25H19C19.4142 11.25 19.75 11.5858 19.75 12C19.75 12.4142 19.4142 12.75 19 12.75H5C4.58579 12.75 4.25 12.4142 4.25 12Z"
                  fill="#12161D"
                />
              </svg>
            </div>
            <p className="text-[#61656E] font-interTight text-lg leading-[25px] w-full tracking-[-0.01em]">
              A verified agent has passed our identity checks, location
              confirmation, and activity review. Only agents who meet our
              verification standards are allowed to list properties on the
              platform.
            </p>
          </div>
          <div className="flex p-6 flex-col items-start gap-[17px] rounded-lg border border-[#E5E5E5] bg-[#FFF] w-full h-20">
            <div className="flex justify-between items-center w-full">
              <p className="text-[#12161D] font-interTight text-2xl font-medium leading-8 w-fit tracking-[-0.01em]">
                Are all properties on this platform real?
              </p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 overflow-hidden relative "
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3.75C12.4142 3.75 12.75 4.08579 12.75 4.5V11.25H19.5C19.9142 11.25 20.25 11.5858 20.25 12C20.25 12.4142 19.9142 12.75 19.5 12.75H12.75V19.5C12.75 19.9142 12.4142 20.25 12 20.25C11.5858 20.25 11.25 19.9142 11.25 19.5V12.75H4.5C4.08579 12.75 3.75 12.4142 3.75 12C3.75 11.5858 4.08579 11.25 4.5 11.25H11.25V4.5C11.25 4.08579 11.5858 3.75 12 3.75Z"
                  fill="#12161D"
                />
              </svg>
            </div>
          </div>
          <div className="flex p-6 flex-col items-start gap-[17px] rounded-lg border border-[#E5E5E5] bg-[#FFF] w-full h-20">
            <div className="flex justify-between items-center w-full">
              <p className="text-[#12161D] font-interTight text-2xl font-medium leading-8 w-fit tracking-[-0.01em]">
                Do I need to pay before inspection?
              </p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 overflow-hidden relative "
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3.75C12.4142 3.75 12.75 4.08579 12.75 4.5V11.25H19.5C19.9142 11.25 20.25 11.5858 20.25 12C20.25 12.4142 19.9142 12.75 19.5 12.75H12.75V19.5C12.75 19.9142 12.4142 20.25 12 20.25C11.5858 20.25 11.25 19.9142 11.25 19.5V12.75H4.5C4.08579 12.75 3.75 12.4142 3.75 12C3.75 11.5858 4.08579 11.25 4.5 11.25H11.25V4.5C11.25 4.08579 11.5858 3.75 12 3.75Z"
                  fill="#12161D"
                />
              </svg>
            </div>
          </div>
          <div className="flex p-6 flex-col items-start gap-[17px] rounded-lg border border-[#E5E5E5] bg-[#FFF] w-full h-20">
            <div className="flex justify-between items-center w-full">
              <p className="text-[#12161D] font-interTight text-2xl font-medium leading-8 w-fit tracking-[-0.01em]">
                Can I report a suspicious agent or listing?
              </p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 overflow-hidden relative "
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3.75C12.4142 3.75 12.75 4.08579 12.75 4.5V11.25H19.5C19.9142 11.25 20.25 11.5858 20.25 12C20.25 12.4142 19.9142 12.75 19.5 12.75H12.75V19.5C12.75 19.9142 12.4142 20.25 12 20.25C11.5858 20.25 11.25 19.9142 11.25 19.5V12.75H4.5C4.08579 12.75 3.75 12.4142 3.75 12C3.75 11.5858 4.08579 11.25 4.5 11.25H11.25V4.5C11.25 4.08579 11.5858 3.75 12 3.75Z"
                  fill="#12161D"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-[33px] w-[1340px] absolute left-[50px] top-[3128px]">
        <div className="flex flex-col items-start gap-[38px] w-full">
          <div className="flex flex-col items-center gap-5 w-full">
            <div className="flex justify-end items-center w-[616px] h-[57px]">
              <p className="text-[#014421] font-interTight text-[40px] font-semibold leading-[55px] w-[631px] h-[60px] text-center tracking-[-0.025em]">
                Are You a Real Estate Agent?
              </p>
            </div>
          </div>
          <div className="flex items-center gap-[19px] w-full">
            <div className="rounded-[14.2px] border-[0.95px] border-[rgba(0,0,0,0.10)] bg-[#FFF] w-[562px] h-[415px] overflow-hidden relative">
              <div className="flex flex-col items-start gap-[15px] w-[522px] absolute left-4 top-[345px]">
                <p className="text-[#525252] font-interTight text-base leading-[22px] w-full tracking-[-0.005em]">
                  Join thousands of verified agents building trust with clients.
                  Create your professional profile and showcase your expertise
                  today.
                </p>
              </div>
              <img
                src="/Image(1).png"
                className="rounded-[12.5px] w-[562px] h-[321px] absolute left-0 top-0 max-w-none"
                alt="Image"
              />
            </div>
            <div className="flex pt-4 pr-4 pb-[26px] pl-4 flex-col items-start gap-[249px] rounded-[14.7px] border-[0.98px] border-[rgba(0,0,0,0.10)] bg-[#FFF] w-[370px] h-[415px] overflow-hidden">
              <p className="flex flex-col justify-center text-[#525252] font-interTight text-base leading-[22px] w-[330px] h-11 tracking-[-0.005em]">
                Show up where serious buyers and sellers are actively searching
                for trusted agents
              </p>
              <button className="cursor-pointer text-nowrap flex justify-center items-center w-[338px] h-20">
                <p className="shrink-0 text-[#014421] font-interTight text-3xl font-medium leading-[35px] w-[338px] h-20 tracking-[-0.0457em]">
                  Increase Your Visibility
                </p>
              </button>
            </div>
            <div className="flex pt-4 pr-4 pb-[26px] pl-4 flex-col items-start gap-[248px] rounded-[14.7px] border-[0.98px] border-[rgba(0,0,0,0.10)] bg-[#014421] w-[370px] h-[415px] overflow-hidden">
              <p className="flex flex-col justify-center text-[#FFF] font-interTight text-base leading-[22px] w-[330px] h-11 tracking-[-0.005em]">
                Stand out with a verified, credible profile that reassures
                clients before the first conversation.
              </p>
              <button className="cursor-pointer text-nowrap flex pb-2.5 justify-center items-center w-[338px] h-[81px]">
                <p className="text-[#FFF] font-interTight text-3xl font-medium leading-[35px] w-[338px] h-[71px] tracking-[-0.0457em]">
                  Build Instant Trust
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="flex py-[15px] px-[150px] justify-center items-center gap-2.5 rounded-[10px] bg-[#014421] w-[276px] h-[58px]">
          <button className="cursor-pointer text-nowrap flex justify-center items-center gap-[7px] w-fit">
            <p className="text-[#F9FFE3] font-interTight text-base font-medium w-[86px]">
              Join Waitlist
            </p>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[17px] h-[17px] overflow-hidden relative "
            >
              <path
                d="M3 8.31855V6.90188L11.5 6.90188L7.60417 3.00605L8.61 2.00021L14.22 7.61021L8.61 13.2202L7.60417 12.2144L11.5 8.31855L3 8.31855Z"
                fill="#F9FFE3"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex p-4 flex-col justify-center items-center gap-2.5 rounded-[14.7px] border-[0.98px] border-[rgba(0,0,0,0.10)] bg-[#FFF] w-[1329px] absolute left-[50px] top-[2580px] overflow-hidden">
        <div className="flex items-center gap-[41px] w-full">
          <div className="flex flex-col items-start gap-[25px] w-[615px] h-[343px]">
            <p className="shrink-0 text-[#014421] font-interTight text-[40px] font-semibold leading-[45px] w-full h-[93px] tracking-[-0.025em]">
              Have a Property to Rent? Let Verified Agents Handle It.
            </p>
            <p className="flex flex-col justify-center shrink-0 text-[#525252] font-interTight text-base leading-[22px] w-[573px] h-[43px] tracking-[-0.005em]">
              Connect with verified rental agents who can manage inspections,
              tenant sourcing, and negotiations—without the stress or
              uncertainty.
            </p>
            <p className="flex flex-col justify-center text-[#525252] font-interTight text-base leading-[22px] w-[604px] h-full tracking-[-0.005em]">
              Verified and accountable agents Transparent rental process Reduced
              risk of disputes and scams
            </p>
            <div className="flex py-[15px] px-[150px] justify-center items-center gap-2.5 shrink-0 rounded-[10px] bg-[#014421] w-[276px] h-[58px]">
              <button className="cursor-pointer text-nowrap flex justify-center items-center gap-[7px] w-fit">
                <p className="text-[#F9FFE3] font-interTight text-base font-medium w-[86px]">
                  Join Waitlist
                </p>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[17px] h-[17px] overflow-hidden relative "
                >
                  <path
                    d="M3 8.3183V6.90164L11.5 6.90164L7.60417 3.0058L8.61 1.99997L14.22 7.60997L8.61 13.22L7.60417 12.2141L11.5 8.3183L3 8.3183Z"
                    fill="#F9FFE3"
                  />
                </svg>
              </button>
            </div>
          </div>
          <img
            src="/Image5.png"
            className="rounded-[15px] w-[641px] h-[392px] max-w-none"
            alt="image 5"
          />
        </div>
      </div>
    </div>
  );
}