export function applyGravity(entity, dt) {
    entity.velocityY += entity.gravity * dt;
    entity.y += entity.velocityY * dt;
}