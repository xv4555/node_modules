import { ModuleRequireService } from '../types';
export default class RequireLibrary implements ModuleRequireService {
    require<T>(module: string): T;
    resolve(request: string, options: {
        paths?: string[];
    }): string;
}
//# sourceMappingURL=RequireLibrary.d.ts.map