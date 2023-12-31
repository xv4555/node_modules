"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
var Constants;
(function (Constants) {
    Constants["STRIPPED"] = "__stripped__";
    Constants["PROCESS_NAME_RENDERER"] = "Renderer";
    Constants["THREAD_NAME_RENDERER_MAIN"] = "CrRendererMain";
    Constants["METADATA_NAME_PROCESS_NAME"] = "process_name";
    Constants["METADATA_NAME_PROCESS_LABELS"] = "process_labels";
    Constants["METADATA_NAME_PROCESS_SORT_INDEX"] = "process_sort_index";
    Constants["METADATA_NAME_THREAD_NAME"] = "thread_name";
    Constants["METADATA_NAME_THREAD_SORT_INDEX"] = "thread_sort_index";
    Constants["METADATA_ARG_NAME"] = "name";
    Constants["METADATA_ARG_LABELS"] = "labels";
    Constants["METADATA_ARG_SORT_INDEX"] = "sort_index";
    Constants["TRACE_EVENT_SCOPE_NAME_GLOBAL"] = "g";
    Constants["TRACE_EVENT_SCOPE_NAME_PROCESS"] = "p";
    Constants["TRACE_EVENT_SCOPE_NAME_THREAD"] = "t";
    Constants["TRACE_EVENT_PHASE_BEGIN"] = "B";
    Constants["TRACE_EVENT_PHASE_END"] = "E";
    Constants["TRACE_EVENT_PHASE_COMPLETE"] = "X";
    Constants["TRACE_EVENT_PHASE_INSTANT"] = "I";
    Constants["TRACE_EVENT_PHASE_ASYNC_BEGIN"] = "S";
    Constants["TRACE_EVENT_PHASE_ASYNC_STEP_INTO"] = "T";
    Constants["TRACE_EVENT_PHASE_ASYNC_STEP_PAST"] = "p";
    Constants["TRACE_EVENT_PHASE_ASYNC_END"] = "F";
    Constants["TRACE_EVENT_PHASE_NESTABLE_ASYNC_BEGIN"] = "b";
    Constants["TRACE_EVENT_PHASE_NESTABLE_ASYNC_END"] = "e";
    Constants["TRACE_EVENT_PHASE_NESTABLE_ASYNC_INSTANT"] = "n";
    Constants["TRACE_EVENT_PHASE_FLOW_BEGIN"] = "s";
    Constants["TRACE_EVENT_PHASE_FLOW_STEP"] = "t";
    Constants["TRACE_EVENT_PHASE_FLOW_END"] = "f";
    Constants["TRACE_EVENT_PHASE_METADATA"] = "M";
    Constants["TRACE_EVENT_PHASE_COUNTER"] = "C";
    Constants["TRACE_EVENT_PHASE_SAMPLE"] = "P";
    Constants["TRACE_EVENT_PHASE_CREATE_OBJECT"] = "N";
    Constants["TRACE_EVENT_PHASE_SNAPSHOT_OBJECT"] = "O";
    Constants["TRACE_EVENT_PHASE_DELETE_OBJECT"] = "D";
    Constants["TRACE_EVENT_PHASE_MEMORY_DUMP"] = "v";
    Constants["TRACE_EVENT_PHASE_MARK"] = "R";
    Constants["TRACE_EVENT_PHASE_CLOCK_SYNC"] = "c";
    Constants["TRACE_EVENT_PHASE_ENTER_CONTEXT"] = "(";
    Constants["TRACE_EVENT_PHASE_LEAVE_CONTEXT"] = ")";
})(Constants = exports.Constants || (exports.Constants = {}));
//# sourceMappingURL=constants.js.map