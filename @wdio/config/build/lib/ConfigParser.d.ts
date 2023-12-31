import type { Capabilities, Options, Services } from '@wdio/types';
import type { PathService, ModuleRequireService } from '../types';
type Spec = string | string[];
interface TestrunnerOptionsWithParameters extends Omit<Options.Testrunner, 'capabilities'> {
    watch?: boolean;
    spec?: string[];
    suite?: string[];
    capabilities?: Capabilities.RemoteCapabilities;
}
interface MergeConfig extends Omit<Partial<TestrunnerOptionsWithParameters>, 'specs' | 'exclude'> {
    specs?: Spec[];
    exclude?: string[];
}
export default class ConfigParser {
    private _pathService;
    private _moduleRequireService;
    private _config;
    private _capabilities;
    constructor(_pathService?: PathService, _moduleRequireService?: ModuleRequireService);
    autoCompile(): void;
    /**
     * merges config file with default values
     * @param {String} filename path of file relative to current directory
     */
    addConfigFile(filename: string): void;
    /**
     * merge external object with config object
     * @param  {Object} object  desired object to merge into the config object
     */
    merge(object?: MergeConfig): void;
    /**
     * Add hooks from an existing service to the runner config.
     * @param {Object} service - an object that contains hook methods.
     */
    addService(service: Services.Hooks): void;
    /**
     * determine what specs to run based on the spec(s), suite(s), exclude
     * attributes from CLI, config and capabilities
     */
    getSpecs(capSpecs?: Spec[], capExclude?: Spec[]): Spec[];
    /**
     * sets config attribute with file paths from filtering
     * options from cli argument
     *
     * @param  {String[]} cliArgFileList  list of files in a string form
     * @param  {Object} config  config object that stores the spec and exclude attributes
     * cli argument
     * @return {String[]} List of files that should be included or excluded
     */
    setFilePathToFilterOptions(cliArgFileList: string[], config: Spec[]): string[];
    /**
     * return configs
     */
    getConfig(): Required<Options.Testrunner>;
    /**
     * return capabilities
     */
    getCapabilities(i?: number): Capabilities.DesiredCapabilities | Capabilities.W3CCapabilities | Capabilities.RemoteCapabilities;
    /**
     * returns a flattened list of globbed files
     *
     * @param  {String[] | String[][]} patterns list of files to glob
     * @param  {Boolean} omitWarnings to indicate omission of warnings
     * @param  {FileSystemPathService} findAndGlob system path service for expanding globbed file names
     * @param  {number} hierarchyDepth depth to prevent recursive calling beyond a depth of 1
     * @return {String[] | String[][]} list of files
     */
    static getFilePaths(patterns: Spec[], omitWarnings?: boolean, findAndGlob?: PathService, hierarchyDepth?: number): Spec[];
    /**
     * returns specs files with the excludes filtered
     *
     * @param  {String[] | String[][]} spec files -  list of spec files
     * @param  {String[]} exclude files -  list of exclude files
     * @return {String[] | String[][]} list of spec files with excludes removed
     */
    filterSpecs(specs: Spec[], exclude: string[]): Spec[];
}
export {};
//# sourceMappingURL=ConfigParser.d.ts.map