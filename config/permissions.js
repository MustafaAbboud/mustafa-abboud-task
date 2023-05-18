import { defineAbility } from '@casl/ability';

export default function permissions(user) {
    return defineAbility((can) => {

        if (user.accessToken) {
            can('read', 'user');

            if (user.role === 'admin') {
                can('delete', 'user');
                can('update', 'user');
                can('create', 'user');
            }
        }
    });
}