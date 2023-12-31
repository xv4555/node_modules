"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.touchAction = exports.validateParameters = exports.formatArgs = void 0;
/**
 * Constants around commands
 */
const TOUCH_ACTIONS = ['press', 'longPress', 'tap', 'moveTo', 'wait', 'release'];
const POS_ACTIONS = TOUCH_ACTIONS.slice(0, 4);
const ACCEPTED_OPTIONS = ['x', 'y', 'element'];
const formatArgs = function (scope, actions) {
    return actions.map((action) => {
        if (Array.isArray(action)) {
            return (0, exports.formatArgs)(scope, action);
        }
        if (typeof action === 'string') {
            action = { action };
        }
        const formattedAction = {
            action: action.action,
            options: {}
        };
        /**
         * don't propagate for actions that don't require element options
         */
        const actionElement = action.element && typeof action.element.elementId === 'string'
            ? action.element.elementId
            : scope.elementId;
        if (POS_ACTIONS.includes(action.action) && formattedAction.options && actionElement) {
            formattedAction.options.element = actionElement;
        }
        if (formattedAction.options && typeof action.x === 'number' && isFinite(action.x))
            formattedAction.options.x = action.x;
        if (formattedAction.options && typeof action.y === 'number' && isFinite(action.y))
            formattedAction.options.y = action.y;
        if (formattedAction.options && action.ms)
            formattedAction.options.ms = action.ms;
        /**
         * remove options property if empty
         */
        if (formattedAction.options && Object.keys(formattedAction.options).length === 0) {
            delete formattedAction.options;
        }
        return formattedAction;
    });
};
exports.formatArgs = formatArgs;
/**
 * Make sure action has proper options before sending command to Appium.
 *
 * @param  {Object} params  touchAction parameters
 * @return null
 */
const validateParameters = (params) => {
    const options = Object.keys(params.options || {});
    if (params.action === 'release' && options.length !== 0) {
        throw new Error('action "release" doesn\'t accept any options ' +
            `("${options.join('", "')}" found)`);
    }
    if (params.action === 'wait' &&
        (options.includes('x') || options.includes('y'))) {
        throw new Error('action "wait" doesn\'t accept x or y options');
    }
    if (POS_ACTIONS.includes(params.action)) {
        for (const option in params.options) {
            if (!ACCEPTED_OPTIONS.includes(option)) {
                throw new Error(`action "${params.action}" doesn't accept "${option}" as option`);
            }
        }
        if (options.length === 0) {
            throw new Error(`Touch actions like "${params.action}" need at least some kind of ` +
                'position information like "element", "x" or "y" options, you\'ve none given.');
        }
    }
};
exports.validateParameters = validateParameters;
const touchAction = function (actions) {
    if (!this.multiTouchPerform || !this.touchPerform) {
        throw new Error('touchAction can be used with Appium only.');
    }
    if (!Array.isArray(actions)) {
        actions = [actions];
    }
    const formattedAction = (0, exports.formatArgs)(this, actions);
    const protocolCommand = Array.isArray(actions[0])
        // cast old JSONWP
        ? this.multiTouchPerform.bind(this)
        : this.touchPerform.bind(this);
    formattedAction.forEach((params) => (0, exports.validateParameters)(params));
    return protocolCommand(formattedAction);
};
exports.touchAction = touchAction;
