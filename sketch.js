const LARGURA_MUNDO = 800;
const ALTURA_MUNDO = 1200;

const TECLA_CIMA = 87; // W
const TECLA_BAIXO = 83; // S
const TECLA_DIREITA = 68; // D
const TECLA_ESQUERDA = 65; // A
const ESPACO = 32;

class Entidade {
  constructor(p_x, p_y, tm_x, tm_y) {
      this.p_x = p_x
      this.p_y = p_y
      this.tm_x = tm_x
      this.tm_y = tm_y
  
      this.cor = {r:145,g:200,b:123}
    }

    mover(direcao,condicao,forca = 10) {
      if(condicao){
      switch (direcao) {
        case 'CIMA':
            this.p_y = this.p_y - forca;
          break;
        case 'BAIXO':
            this.p_y = this.p_y + forca;
          break;
        case 'DIREITA':
            this.p_x = this.p_x + forca;
          break;
        case 'ESQUERDA':
            this.p_x = this.p_x - forca;
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
  //  personagem caindo
  //this.p_y = this.p_y + 8
}
}




class Retangulo {
  constructor(p_x, p_y, tm_x, tm_y) {
    this.p_x = p_x
    this.p_y = p_y
    this.tm_x = tm_x
    this.tm_y = tm_y

    this.cor = {r:145,g:200,b:123}

  }


  desenha() {
    push(); // Start a new drawing state
    fill(23, 44, 200)
    rect(this.p_x, this.p_y, this.tm_y, this.tm_y)
    pop();

  }

  calcula_colisao(rect2) {
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection


    if (this.p_x < rect2.p_x + rect2.tm_x &&
      this.p_x + this.tm_x > rect2.x &&
      this.p_y < rect2.p_y + rect2.tm_y &&
      this.p_y + this.tm_y > rect2) {

      return true
    } else
      return false
  }


}

class Parede extends Entidade {
  constructor(p_x, p_y, tm_x, tm_y){
    super(p_x, p_y, tm_x, tm_y)
    
  }

  renderizar() {
    push(); // Start a new drawing state
    fill(0, 0, 0)
    rect(this.p_x, this.p_y, this.tm_y, this.tm_y)
    pop();

  }
}

class Vazio extends Entidade {
  constructor(p_x, p_y, tm_x, tm_y){
    super(p_x, p_y, tm_x, tm_y)
    
  }

  renderizar() {
    push(); // Start a new drawing state
    fill(100, 200, 20)
    rect(this.p_x, this.p_y, this.tm_y, this.tm_y)
    pop();

  }
}

class Objetivo extends Entidade {
  constructor(p_x, p_y, tm_x, tm_y){
    super(p_x, p_y, tm_x, tm_y)
    
  }

  renderizar() {
    push(); // Start a new drawing state
    fill(0, 0, 240)
    rect(this.p_x, this.p_y, this.tm_y, this.tm_y)
    pop();

  }
}

class Perigo extends Entidade {
  constructor(p_x, p_y, tm_x, tm_y){
    super(p_x, p_y, tm_x, tm_y)
    
  }

  renderizar() {
    push(); // Start a new drawing state
    fill(255, 144, 0)
    rect(this.p_x, this.p_y, this.tm_y, this.tm_y)
    pop();

  }
}



//  calcular a a fisica do player caindo 
//  fazer o player se mover usando o teclado.
class Player extends Entidade {
  constructor(p_x, p_y, tm_x, tm_y) {
    
    super(p_x, p_y, tm_x, tm_y)
    this.cor = {r:0,g:200,b:123}

    
  }
  

  renderizar() {
    this.aplicarFisica()
    // push(); // Start a new drawing state
    // fill(this.cor.r, this.b, this.cor.g)
    rect(this.p_x, this.p_y, this.tm_y, this.tm_y)
    // pop();
  }

}




class Jogo {
  constructor(largura, altura) {
    
    this.largura = largura
    this.altura = altura

    this.tamanho_pca = 40

    this._cria_grid_jogo()
  }

  _cria_grid_jogo() {
    this.array_y = Array(this.largura / 40).fill(
      Array(this.altura/40).fill(0)
    )

    
    this._cria_pecas()
  }

  _cria_pecas(){
    this.pecas = []
    this.array_y.forEach( (ele,i)=>{
      // console.log(ele)
      let pecas_x =[]
      ele.forEach((ele_2,j)=>{

        let regr_espaco_vazio = ele_2 === 0 
        let regr_espaco_parede = ele_2 === 1 
        let regr_espaco_objetivo = ele_2 === 2
        let regr_espaco_perigo = ele_2 === 3
        
        if (regr_espaco_vazio ) {
          pecas_x.push( new Vazio(j*this.tamanho_pca, i *this.tamanho_pca, this.tamanho_pca, this.tamanho_pca))
        }
        if (regr_espaco_parede ) {
          pecas_x.push( new Parede(j*this.tamanho_pca, i *this.tamanho_pca, this.tamanho_pca, this.tamanho_pca))
        }
        if (regr_espaco_objetivo ) {
          pecas_x.push( new Objetivo(j*this.tamanho_pca, i *this.tamanho_pca, this.tamanho_pca, this.tamanho_pca))
        }
        if (regr_espaco_perigo ) {
          pecas_x.push( new Perigo(j*this.tamanho_pca, i *this.tamanho_pca, this.tamanho_pca, this.tamanho_pca))
        }

        // pecas_x.push( new Retangulo(j*this.tamanho_pca, i *this.tamanho_pca, this.tamanho_pca, this.tamanho_pca))
        
      })
      this.pecas.push(pecas_x)
    
    })
  }


  // seta o grid dojogo
  set_grid_jogo(array_y){
    this.array_y = array_y
    this._cria_pecas()


  }

  desenha_grid(){
    this.pecas.forEach(ele =>{
      ele.forEach(ele2 =>{
        ele2.renderizar()
      })
    })
  }

}

// que posição o player vai começar?
  // player.
// 0 é igual ao vazio
// 1 é igual a parede
// 2 e igual ao objetivo
// 3 é igual ao bloco que é perigoso

const resposta_servidor ={
  player: {p_x:200,p_y:200},
  arena: [Array(30).fill(0),
    Array(30).fill(0),
    Array(30).fill(0),
    Array(30).fill(0),
    Array(30).fill(0),
    Array(30).fill(0),
    Array(30).fill(0),
    Array(30).fill(0),
    Array(30).fill(0),
    Array(30).fill(0),
    Array(30).fill(0),
    Array(30).fill(0),
    Array(30).fill(0),
    Array(30).fill(0),
    Array(30).fill(0),
    Array(30).fill(0),
    Array(30).fill(0),
    Array(30).fill(3),
    Array(30).fill(2),
    Array(30).fill(1)]
}

const jogo = new Jogo(LARGURA_MUNDO, ALTURA_MUNDO)
const player = new Player(resposta_servidor.player.p_x, resposta_servidor.player.p_y, 40, 40)


function setup() {

  // put setup code here
  createCanvas(jogo.altura, jogo.largura)
  
  jogo.set_grid_jogo(resposta_servidor.arena)

}

function draw() {
  // put drawing code here

  background(123)
  jogo.desenha_grid();
  player.renderizar();

  player.mover('CIMA',keyIsDown(ESPACO))
  player.mover('BAIXO',keyIsDown(TECLA_BAIXO))
  player.mover('DIREITA',keyIsDown(TECLA_DIREITA))
  player.mover('ESQUERDA',keyIsDown(TECLA_ESQUERDA))
}




