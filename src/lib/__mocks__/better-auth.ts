export const betterAuth = jest.fn().mockImplementation(() => ({
  api: {},
}));

export const createAuthClient = jest.fn().mockReturnValue({});

export const nextCookies = jest.fn().mockReturnValue({});

export const prismaAdapter = jest.fn().mockReturnValue({});
