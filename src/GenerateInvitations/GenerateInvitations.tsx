import { useState } from "react";
import { Template } from "../types";

export const GenerateInvitations = ({
  selectedTemplates,
  respondents,
  setRespondents,
  goToNextStep,
}: {
  selectedTemplates: Template[];
  respondents: { link: string; id: number }[];
  setRespondents: (respondents: { link: string; id: number }[]) => void;
  goToNextStep: () => void;
}) => {
  const [candidateCount, setCandidateCount] = useState<number>();

  const generateInvitationLinks = async (numberOfRespondents: number) => {
    try {
      const testSuite = await fetch(
        `${
          import.meta.env.VITE_APP_TESTZEBRA_API_URL
        }/api/public/v1/test-suite`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${
              import.meta.env.VITE_APP_TESTZEBRA_API_KEY
            }`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "2024_06_02_company_name",
            testTemplateIds: selectedTemplates.map((t) => t.id),
            isWebcamDemanded: false,
            isAnonymous: true,
            isCollectingExitFullScreen: false,
            isCollectingMouseExit: false,
            testsLanguageSettings: selectedTemplates.map((t) => ({
              testTemplateId: t.id,
              languageConstraint: "candidatesChoice",
              language: t.language,
            })),
            showRespondentsResults: "DO_NOT_SHOW",
          }),
        }
      ).then((res) => res.json());

      const respondents = await fetch(
        `${
          import.meta.env.VITE_APP_TESTZEBRA_API_URL
        }/api/public/v1/test-suite/${
          testSuite.testSuiteId
        }/candidate/anonymous`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${
              import.meta.env.VITE_APP_TESTZEBRA_API_KEY
            }`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: "en",
            candidatesCount: numberOfRespondents,
          }),
        }
      ).then((res) => res.json());

      setRespondents(respondents);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="mt-8">
      <form
        className="flex gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.currentTarget.count.value);
          generateInvitationLinks(Number(e.currentTarget.count.value));
        }}
      >
        <input
          className="p-4 text-lg border border-gray-300 rounded-md w-32"
          name="count"
          type="number"
          placeholder="Number of respondents"
          onChange={(e) => setCandidateCount(Number(e.currentTarget.value))}
          min="1"
        />
        <button
          disabled={
            !candidateCount || candidateCount < 1 || candidateCount > 100
          }
          className="btn btn-primary"
        >
          Create invitation links
        </button>
      </form>

      <div className="mt-8 grid gap-4">
        {respondents.map(({ link, id }, i) => (
          <div className="flex gap-8 items-center" key={i}>
            <div>Candidate (#{id})</div>
            <a target="_blank" href={link}>
              <button className="btn btn-secondary">Test Link</button>
            </a>
          </div>
        ))}
      </div>

      {respondents.length > 0 && (
        <div className="mt-8">
          <button onClick={goToNextStep} className="btn btn-primary">
            Check results
          </button>
        </div>
      )}
    </div>
  );
};
