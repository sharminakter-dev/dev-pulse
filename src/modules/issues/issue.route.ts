import { Router } from "express";
import { issuceController } from "./issue.controller";
import { auth, authorizedRoles } from "../../middleware/auth";
import { validateIssue } from "../../middleware/validateIssue";
import { USER_ROLE } from "../auth/auth.Interface";
import { ISSUE_MODE } from "./issue.type";
import { editPermission } from "../../middleware/editPermission";
import deletePermission from "../../middleware/deletePermission";

const router = Router();

router.post('/', 
    validateIssue(ISSUE_MODE.create), 
    auth, 
    authorizedRoles(USER_ROLE.maintainer, USER_ROLE.contributor), 
    issuceController.createIssue
);

router.get('/', issuceController.getAllIssues);

router.get('/:id', issuceController.getUserById);

router.patch('/:id',
    validateIssue(ISSUE_MODE.update),
    auth,
    authorizedRoles(USER_ROLE.maintainer, USER_ROLE.contributor),
    editPermission,
    issuceController.updateIssueById
);

router.delete('/:id',
    auth,
    authorizedRoles(USER_ROLE.maintainer),
    deletePermission,
    issuceController.deleteIssueById
);

export const issueRoute = router;