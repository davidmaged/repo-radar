export interface IRepo {
  id: number;
  name: string;
  fullName: string;
  owner: string;
  stars: number;
  openIssues: number;
  lastCommitDate: string | null;
  htmlUrl: string;
  description?: string;
}
