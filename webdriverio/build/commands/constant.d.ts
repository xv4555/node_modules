import { TouchAction, TouchActions } from '../types';
interface FormattedTouchAction extends Omit<TouchAction, 'element'> {
    element?: string;
}
interface FormattedActions {
    action: string;
    options?: FormattedTouchAction;
}
export declare const formatArgs: (scope: WebdriverIO.Browser | WebdriverIO.Element, actions: TouchActions[]) => FormattedActions[];
/**
 * Make sure action has proper options before sending command to Appium.
 *
 * @param  {Object} params  touchAction parameters
 * @return null
 */
export declare const validateParameters: (params: FormattedActions) => void;
export declare const touchAction: (this: WebdriverIO.Browser | WebdriverIO.Element, actions: TouchActions) => Promise<void>;
export {};
//# sourceMappingURL=constant.d.ts.map