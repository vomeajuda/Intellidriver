import obd
import time
import os
from datetime import datetime

nome_arquivo = "dados.txt"
dados = ""
print("Conectando")
conexaoOBD = obd.OBD("com4")

while True:

    rotacoesCmd = obd.commands.RPM
    velocidadeCmd = obd.commands.SPEED
    temperaturaCmd = obd.commands.COOLANT_TEMP
    combustivelCmd = obd.commands.FUEL_LEVEL

    rotacoesRec = conexaoOBD.query(rotacoesCmd)
    velocidadeRec = conexaoOBD.query(velocidadeCmd)
    temperaturaRec = conexaoOBD.query(temperaturaCmd)
    combustivelRec = conexaoOBD.query(combustivelCmd)

    print("RPM: " + str(rotacoesRec))
    print("Velocidade: " + str(velocidadeRec))
    print("Temperatura: " + str(temperaturaRec))
    print("Combustivel: " + str(combustivelRec))

    agora = datetime.now()

    dados = "Date/Time: " + str(agora) + "\nRPM:" + str(rotacoesRec) + "\nVelocidade: " + str(velocidadeRec) + "\nTemperatura:" + str(temperaturaRec) + "\nCombutível:" + str(combustivelRec) + "\n \n" 

    with open(nome_arquivo, 'a+') as arquivo:
        arquivo.write(dados)

    time.sleep(1)

    clear = lambda: os.system('cls')
    clear()