const agents = [
  {
    name: "Phishing Triage",
    utilisation: 82,
  },
  {
    name: "Malware Analyst",
    utilisation: 67,
  },
  {
    name: "URL Detonation",
    utilisation: 54,
  },
  {
    name: "Threat Intel",
    utilisation: 45,
  },
  {
    name: "Correlation",
    utilisation: 31,
  },
];

export default function AgentUtilisation() {
  return (
    <div className="space-y-5">
      {agents.map((agent) => (
        <div key={agent.name}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-gray-300">
              {agent.name}
            </span>

            <span className="text-sm text-gray-500">
              {agent.utilisation}%
            </span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1e2a3d]">
            <div
              className="h-full rounded-full bg-[#4f8df7]"
              style={{
                width: `${agent.utilisation}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}