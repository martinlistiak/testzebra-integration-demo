import { useRef, useState } from "react";
import "./App.css";
import { TemplateList } from "./TemplateList/TemplateList";
import { Template } from "./types";
import { GenerateInvitations } from "./GenerateInvitations/GenerateInvitations";
import { TestResults } from "./TestResults/TestResults";

function App() {
  const highestStep = useRef(0);
  const [selectedTemplates, setSelectedTemplates] = useState<Template[]>([]);
  const [respondents, setRespondents] = useState<
    { link: string; id: number }[]
  >([]);
  const [step, setStep] = useState(0);

  if (step > highestStep.current) {
    highestStep.current = step;
  }

  return (
    <>
      <div className="flex flex-col justify-start items-center">
        <h1 className="text-3xl font-bold mb-12">
          TestZebra.com integration demo
        </h1>
        {/* <button
          onClick={() => setStep((prev) => prev + 1)}
          className="btn btn-primary"
        >
          Click me
        </button>
        <p>Step: {step}</p> */}
        {/* 3 tabs [test template list, sending invitations, checking results] */}
        <div className="flex flex-col">
          <div className="flex flex-row">
            <button
              onClick={() => setStep(0)}
              className={`btn btn-${
                step === 0 ? "primary" : "secondary"
              } rounded-r-sm`}
            >
              Test template list
            </button>
            <button
              disabled={highestStep.current < 1}
              onClick={() => setStep(1)}
              className={`btn btn-${
                step === 1 ? "primary" : "secondary"
              } rounded-none`}
            >
              Sending invitations
            </button>
            <button
              disabled={highestStep.current < 2}
              onClick={() => setStep(2)}
              className={`btn btn-${
                step === 2 ? "primary" : "secondary"
              } rounded-l-sm`}
            >
              Checking results
            </button>
          </div>

          <div>
            {step === 0 && (
              <TemplateList
                setSelectedTemplates={setSelectedTemplates}
                selectedTemplates={selectedTemplates}
                goToNextStep={() => setStep(1)}
              />
            )}
            {step === 1 && (
              <GenerateInvitations
                selectedTemplates={selectedTemplates}
                setRespondents={setRespondents}
                respondents={respondents}
                goToNextStep={() => setStep(2)}
              />
            )}

            {step === 2 && <TestResults respondents={respondents} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
