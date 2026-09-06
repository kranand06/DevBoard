// src/pages/leetcode/LanguageProficiency.jsx
import BentoCard from '../../Components/BentoCard.jsx';

const languageColors = {
  'C++': '#00599c',
  Java: '#f89820',
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3776ab',
  MySQL: '#4479a1',
  SQL: '#4479a1',
  Other: '#4edea3',
};

function getLanguageLetter(languageName) {
  if (languageName === 'C++') return 'C++';
  if (languageName === 'C#') return 'C#';

  return languageName?.charAt(0).toUpperCase() || '?';
}

export default function LanguageProficiency({
  languageProblemCount = [],
}) {
  const languages = [...languageProblemCount].sort(
    (a, b) => b.problemsSolved - a.problemsSolved
  );

  const totalSolved = languages.reduce(
    (total, language) => total + (language.problemsSolved || 0),
    0
  );

  return (
    <BentoCard className="p-6 md:col-span-4">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#dae2fd]">
            Language Proficiency
          </h3>

          <p className="mt-1 text-xs text-[#c7c4d7]">
            {totalSolved} problems solved across languages
          </p>
        </div>

        <span className="rounded-lg bg-[#4edea3]/10 px-2.5 py-1 text-xs font-medium text-[#4edea3]">
          {languages.length} languages
        </span>
      </div>

      {languages.length === 0 ? (
        <p className="text-sm text-[#c7c4d7]">
          No language-solving data available.
        </p>
      ) : (
        <div className="space-y-4">
          {languages.map((language) => {
            const color =
              languageColors[language.languageName] ||
              languageColors.Other;

            const percentage = totalSolved
              ? Math.round(
                  (language.problemsSolved / totalSolved) * 100
                )
              : 0;

            return (
              <div key={language.languageName}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 min-w-8 items-center justify-center rounded border text-xs font-bold"
                      style={{
                        color,
                        borderColor: `${color}55`,
                        backgroundColor: `${color}18`,
                      }}
                    >
                      {getLanguageLetter(language.languageName)}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-[#dae2fd]">
                        {language.languageName}
                      </p>

                      <p className="text-xs text-[#c7c4d7]">
                        {percentage}% of solved problems
                      </p>
                    </div>
                  </div>

                  <span className="text-lg font-semibold text-[#dae2fd]">
                    {language.problemsSolved}
                  </span>
                </div>

                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#222a3d]">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </BentoCard>
  );
}