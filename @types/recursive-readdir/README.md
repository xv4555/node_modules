# Installation
> `npm install --save @types/recursive-readdir`

# Summary
This package contains type definitions for recursive-readdir (https://github.com/jergason/recursive-readdir/).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/recursive-readdir.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/recursive-readdir/index.d.ts)
````ts
// Type definitions for recursive-readdir 2.2
// Project: https://github.com/jergason/recursive-readdir/
// Definitions by: Micah Zoltu <https://github.com/MicahZoltu>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

import * as fs from "fs";
declare namespace RecursiveReaddir {
    type IgnoreFunction = (file: string, stats: fs.Stats) => boolean;
    type Ignores = ReadonlyArray<string|IgnoreFunction>;
    type Callback = (error: Error, files: string[]) => void;
    interface readDir {
        (path: string, ignores?: Ignores): Promise<string[]>;
        (path: string, callback: Callback): void;
        (path: string, ignores: Ignores, callback: Callback): void;
    }
}

declare var recursiveReadDir: RecursiveReaddir.readDir;
export = recursiveReadDir;

````

### Additional Details
 * Last updated: Thu, 14 Apr 2022 17:01:30 GMT
 * Dependencies: [@types/node](https://npmjs.com/package/@types/node)
 * Global values: none

# Credits
These definitions were written by [Micah Zoltu](https://github.com/MicahZoltu).
