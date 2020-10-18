import { container } from 'tsyringe';

import BCryptHashProvider from './Hash/implementations/BCryptHashProvider';
import IHashProvider from './Hash/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
