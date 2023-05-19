import { defineAbility } from '@casl/ability';

export default function permissions(user, toolsEnabled) {
    return defineAbility((can) => {

        if (user.accessToken) {
            can('read', 'user');

            if (toolsEnabled)
                if (user.role === 'admin') {
                    can('manage', 'user');
                }
        }
    });
}