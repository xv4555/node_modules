import CriConnection from 'lighthouse/lighthouse-core/gather/connections/cri';
/**
 * this class got patched to enable connecting to a remote path like
 * ws://192.168.0.39:4444/session/349a44a32846c2659c703e71403bd472/se/cdp
 * as it requires to attach to a session before.
 */
export default class ChromeProtocolPatched extends CriConnection {
    private _sessionId?;
    /**
     * Add constructor for typing safety
     * @param {number=} port Optional port number. Defaults to 9222;
     * @param {string=} hostname Optional hostname. Defaults to localhost.
     * @constructor
     */
    constructor(port?: string, hostname?: string);
    setSessionId(sessionId: string): void;
    /**
     * force every command to be send with the given session id
     */
    sendCommand(method: string, sessionId?: string, ...paramArgs: any[]): any;
}
//# sourceMappingURL=cri.d.ts.map