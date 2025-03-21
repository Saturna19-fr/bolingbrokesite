import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc, userAc } from "better-auth/plugins/admin/access";
 
const statement = {
    ...defaultStatements, 
    project: ["newmember", "readformation", "assignformation", "removeformation", "revokeuser", "changerank"],
} as const;
 
export const ac = createAccessControl(statement);

export const user = ac.newRole({
    ...userAc.statements,
})

export const admin = ac.newRole({
    project: ["newmember", "readformation", "assignformation", "removeformation", "revokeuser", "changerank"],
    ...adminAc.statements, 
});

export const direction = ac.newRole({
    ...adminAc.statements, 
    project: [...statement.project],
});

export const formateur = ac.newRole({
    ...userAc.statements, 
    project: ["readformation", "assignformation", "removeformation"],
});

export const sergent = ac.newRole({
    ...userAc.statements, 
    project: ["readformation", "assignformation","removeformation", "newmember"],
});