import obd
import time
import os
import csv
from datetime import datetime

nome_arquivo = 'dados.txt'
dados = ''
print('Conectando')
conexaoOBD = obd.OBD('com4')

now = datetime.now()
str_time = now.strftime('%d-%m-%Y_%H-%M-%S')

rotacoesCmd = obd.commands.RPM
velocidadeCmd = obd.commands.SPEED
temperaturaCmd = obd.commands.COOLANT_TEMP
combustivelCmd = obd.commands.FUEL_LEVEL

with open ('../data/data_'+str_time+'.csv', 'w', newline='') as csvfile:
    fieldnames = ['time', 'rpm', 'velocidade', 'temperatura', 'combustivel']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames, dialect='excel')
    
    writer.writeheader()

    while True:
        rotacoesRec = conexaoOBD.query(rotacoesCmd)
        velocidadeRec = conexaoOBD.query(velocidadeCmd)
        temperaturaRec = conexaoOBD.query(temperaturaCmd)
        combustivelRec = conexaoOBD.query(combustivelCmd)

        print("RPM: " + str(rotacoesRec))
        print("Velocidade: " + str(velocidadeRec))
        print("Temperatura: " + str(temperaturaRec))
        print("Combustivel: " + str(combustivelRec))
        
        writer.writerow({
            'time': str(datetime.now()),
            'rpm': str(rotacoesRec), 
            'velocidade': str(velocidadeRec), 
            'temperatura': str(temperaturaRec), 
            'combustivel': str(combustivelRec)
            })

        time.sleep(1)

        # dados = "Date/Time: " + str(agora) + "\nRPM:" + str(rotacoesRec) + "\nVelocidade: " + str(velocidadeRec) + "\nTemperatura:" + str(temperaturaRec) + "\nCombutível:" + str(combustivelRec) + "\n \n" 

        # with open(nome_arquivo, 'a+') as arquivo:
        #     arquivo.write(dados)

        clear = lambda: os.system('cls')
        clear()