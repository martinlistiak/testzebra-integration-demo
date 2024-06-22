import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Template } from "../types";

export const TemplateList = ({
  selectedTemplates,
  setSelectedTemplates,
  goToNextStep,
}: {
  selectedTemplates: Template[];
  setSelectedTemplates: Dispatch<SetStateAction<Template[]>>;
  goToNextStep: () => void;
}) => {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_APP_TESTZEBRA_API_URL
      }/api/public/v1/templates?language=en`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_APP_TESTZEBRA_API_KEY}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setTemplates(data.templates));
  }, []);

  console.log(templates);

  const toggleSelected = (template: Template) => {
    setSelectedTemplates((prev: Template[]) => {
      if (prev.find((t) => t.id === template.id)) {
        return prev.filter((t) => t.id !== template.id);
      } else {
        return [...prev, template];
      }
    });
  };

  return (
    <div className="grid">
      <div className="my-8 flex items-center gap-3 justify-end">
        <div>Continue with {selectedTemplates.length} tests</div>
        <button
          onClick={goToNextStep}
          className="btn btn-primary"
          disabled={!selectedTemplates.length}
        >
          Continue
        </button>
      </div>
      {templates.map((template) => {
        const isSelected = selectedTemplates.find(
          (st) => st.id === template.id
        );
        return (
          <div
            className="flex items-center gap-4 p-2 w-full justify-end"
            key={template.id}
          >
            <h2 className="justify-self-start flex-4 w-full text-left">
              {template.name}
            </h2>
            <p className="flex text-nowrap">{template.creditCost * 2.5} EUR</p>
            <button
              onClick={() => toggleSelected(template)}
              className={`btn btn-${isSelected ? "error" : "secondary"}`}
            >
              {isSelected ? "Deselect" : "Select"}
            </button>
          </div>
        );
      })}
    </div>
  );
};
