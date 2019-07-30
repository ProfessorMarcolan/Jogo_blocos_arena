/**
* 
* @param {Number} p_x posição x
* @param {Number} p_y posição x
* @param {Number} tm_x acho que é altura 
* @param {Number} tm_y acho que é largura
*/

class Entidade {
    constructor(p_x, p_y, tm_x, tm_y) {
        this.p_x = p_x
        this.p_y = p_y
        this.tm_x = tm_x
        this.tm_y = tm_y
    
        this.cor = {r:145,g:200,b:123}
      }

      mover(direcao,keycode,key) {
        if(keycode === key){
        switch (direcao) {
          case 'CIMA':
              this.p_y = this.p_y - 10;
            break;
          case 'BAIXO':
              this.p_y = this.p_y + 10;
            break;
          case 'DIREITA':
              player.p_x = player.p_x + 10;
            break;
          case 'ESQUERDA':
              player.p_x = player.p_x - 10;
            break;
    
          default:
            break;
        }
      }
    
      }

   renderizar(){
        return true;
   }

   verificarColisao(entidade) {
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection


    if (this.p_x < entidade.p_x + entidade.tm_x &&
      this.p_x + this.tm_x > rect2.x &&
      this.p_y < entidade.p_y + entidade.tm_y &&
      this.p_y + this.tm_y > entidade) {

      return true
    } else
      return false
  }

  aplicarFisica() {
    // p13
    //  personagem caindo
    //this.p_y = this.p_y + 8
  }
}

export default Entidade;