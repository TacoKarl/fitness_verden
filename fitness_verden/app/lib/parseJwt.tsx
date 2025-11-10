
export interface JwtPayload {
    Name: string;
    Role: "Manager" | "PersonalTrainer" | "Client";
    UserId: string;
    GroupId: string;
    nbf?: string;
    exp?: string;
    [key: string]: any;
}

export function parseJwt(token: string) {
    try {
        const base64Payload = token.split(".")[1];
        const payload = atob(base64Payload); // decode base64
        return JSON.parse(payload);
    } catch (e) {
        return null;
    }
}
