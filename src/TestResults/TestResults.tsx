export const TestResults = ({
  respondents,
}: {
  respondents: { link: string; id: number }[];
}) => {
  return (
    <div className="mt-8 grid w-full">
      {respondents.map((respondent) => (
        <iframe
          key={respondent.id}
          className="w-full"
          src={`${import.meta.env.VITE_APP_TESTZEBRA_API_URL}/test/${
            respondent.id
          }`}
        />
      ))}
    </div>
  );
};
