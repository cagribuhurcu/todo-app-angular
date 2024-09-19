export interface Task {
    id: string;
    title: string;
    description?: string;
    assignee?: {
      fullName?: string;
      initials?: string;
    } | null;
  }