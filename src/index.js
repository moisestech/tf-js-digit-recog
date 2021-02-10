import tf from 'tensorflow/tfjs'
import canvas from "./components"


const model = tf.Model;
const linearModel = tf.Sequential;
predictions: any

// LOAD PRETRAINED KERAS MODEL

async loadModel() {
  this.model = await tf.loadModel('/assets/model/model.json');

  async predict(imageData: ImageData) {
    const pred = await tf.tidy(() => {
      let img = tf.mfromPixels(imageData, 1);
      image = img.reshape([1, 28, 28, 1]);
      img = tf.cast(img, 'float32');

      // Make and format the predications
      const output = this.model.predict(img) as any;

      // Save prediction so on the component
      this.predictions = Array.from(output.dataSync());
    })
  }
}

onInit() {
  this.trainNewModel();
  this.loadModel();
}

async trainNewModel() {
  // Define a model for linear regression
  this.linearModel = tf.sequential
}