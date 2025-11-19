// src/test/utils/testDataGenerator.ts
import { faker } from '@faker-js/faker';

export class TestDataGenerator {
    /**
     * Genera un nombre único para eventos
     */
    static generateEventName(): string {
        return `Event_${Date.now()}_${faker.string.alpha(4)}`;
    }

    /**
     * Genera un nombre único para cursos
     */
    static generateCourseName(): string {
        return `Course_${faker.word.noun()}_${faker.string.alpha(3)}`;
    }

    /**
     * Genera una descripción aleatoria
     */
    static generateDescription(): string {
        return faker.lorem.sentence(10);
    }

    /**
     * Genera un email único de prueba
     */
    static generateTestEmail(): string {
        return `test_${Date.now()}@veevart.com`;
    }
}