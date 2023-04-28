export type UserInfos = {
  id: number;
  username: string;
  email: string;
  phone: string;
  createdAt: Date;
};

export type SubDetails = {
  info: string;
  price: number;
  subscriptionStart: Date;
  subscriptionEnd: Date;
  subscriptionStatus: string;
};

export type Template = {
  id: number;
  name: string;
  subject: string;
  createdAt: Date;
  updatedAt: Date;
  companyId: Company;
};

export type Company = {
  name: string;
};

export type Companies = {
  id: number;
  name: string;
  siret: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  facebook: string;
  instagram: string;
  twitter: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
