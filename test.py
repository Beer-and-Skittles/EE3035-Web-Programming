import nn

Class test():
    def nothing(self):

        input_dim = 0

        self.layers = nn.Sequential(
            nn.Linear(input_dim, 16),
            nn.Dropout(p=0.1)
            nn.LeakyReLU(0.2),
            nn.Linear(16,1)
        )
        
config = {
    'seed': 5201314,        # random seed number
    'valid_ratio': 0.1,     # validation_size = train_size * valid_ratio
    'test_ratio': 0.1,      # test_rize = train_size * test_ratio
    'n_epochs': 800,        
    'batch_size': 16, 
    'learning_rate': 1e-5,               
}