import { PathService } from '../types';
export default class FileSystemPathService implements PathService {
    getcwd(): string;
    loadFile<T>(path: string): T;
    isFile(filepath: string): boolean;
    glob(pattern: string): string[];
    ensureAbsolutePath(filepath: string): string;
}
//# sourceMappingURL=FileSystemPathService.d.ts.map