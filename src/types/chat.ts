export interface ApiError {
  message: string;
  status?: number;
}

export interface Memory {
  _id?: string;
  userId:string
  sessionId?: string;
  messages: {
    role: "user" | "assistant";
    content: string;
    timestamp?: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}
