import { uploadFile, downloadFile } from '../dals/dalsFunctions';
import { completed, pending } from '../dals/dalsFunctions';
import { create, view, edit, destroy, comment } from '../dals/dalsFunctions';

exports.createFacade = create;

exports.viewFacade = view;

exports.editFacade = edit;

exports.destroyFacade = destroy;

exports.markCompletedFacade = completed;

exports.markPendingFacade = pending;

exports.commentFacade = comment;

exports.uploadFacade = uploadFile;

exports.downloadFacade = downloadFile;