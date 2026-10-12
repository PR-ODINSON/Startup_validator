export type IdeaContext = {
  title: string;
  description: string;
  domain?: string;
  stage?: string;
  type?: string;
};

export function formatIdeaContext(idea: IdeaContext): string {
  return [
    `Title: ${idea.title}`,
    `Description: ${idea.description}`,
    idea.domain ? `Domain: ${idea.domain}` : null,
    idea.stage ? `Stage: ${idea.stage}` : null,
    idea.type ? `Type: ${idea.type}` : null,
  ]
    .filter((line): line is string => line !== null)
    .join('\n');
}
