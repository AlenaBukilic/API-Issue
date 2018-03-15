import { createFacade, viewFacade, editFacade, destroyFacade } from '../facade/facadeFunctions';
import { markCompletedFacade, markPendingFacade, commentFacade } from '../facade/facadeFunctions';

exports.create = createFacade;

exports.view = viewFacade;

exports.edit = editFacade;

exports.destroy = destroyFacade;

exports.markCompleted = markCompletedFacade;

exports.markPending = markPendingFacade;

exports.comment = commentFacade;