import { Inject, Injectable } from '@nestjs/common';

import { Enforcer } from 'casbin';

import { CASBIN_ENFORCER } from './constants/token.const';
import { ActionType } from './types/action.type';

@Injectable()
export class AuthorizationService {
  constructor(@Inject(CASBIN_ENFORCER) private readonly enforcer: Enforcer) {}

  public checkPermission(...args: string[]) {
    return this.enforcer.enforce(...args);
  }

  public mappingAction(method: string) {
    const table: Record<string, ActionType> = {
      GET: ActionType.READ,
      POST: ActionType.CREATE,
      PUT: ActionType.UPDATE,
      PATCH: ActionType.UPDATE,
      DELETE: ActionType.DELETE,
    };

    return table[method.toUpperCase()];
  }
}
