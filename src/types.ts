export type EnvType = 'string' | 'number' | 'boolean';

export interface EnvVarSchema {
    type: EnvType;
    required?: boolean;
    default?: any;
    transform?: ((value: string) => any) | string;
    constraints?: {
        startsWith?: string;
        regex?: RegExp;
        min?: number;
        max?: number;
        isEmail?: boolean;
    };
    mask?: boolean;
}

export type EnvSchema = Record<string, EnvVarSchema>;
export type LoadedEnv<T extends EnvSchema> = { [K in keyof T]: any };
